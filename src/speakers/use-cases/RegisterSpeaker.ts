import type { interfaces } from "inversify";
import { SpeakerId } from "../../shared/domain/models/ids/SpeakerId.ts";
import { EmailAddress } from "../../shared/domain/models/EmailAddress.ts";
import { PlainPassword } from "../../shared/domain/models/PlainPassword.ts";
import type { SpeakerRepository } from "../domain/repositories/SpeakerRepository.ts";
import { Token } from "../../shared/domain/services/Token.ts";
import { Speaker } from "../domain/models/Speaker.ts";
import type { EventBus } from "../../shared/domain/models/hex/EventBus.ts";
import type { Crypto } from "../../shared/domain/services/Crypto.ts";
import { SpeakerEmailAlreadyUsedError } from "../domain/errors/SpeakerEmailAlreadyUsedError.ts";
import { SpeakerAlreadyCreatedError } from "../domain/errors/SpeakerAlreadyCreatedError.ts";

export type RegisterSpeakerParams = {
  id: SpeakerId;
  email: EmailAddress;
  password: PlainPassword;
};

export class RegisterSpeaker {
  private readonly speakerRepository: SpeakerRepository;
  private readonly crypto: Crypto;
  private readonly eventBus: EventBus;

  public static create({ container }: interfaces.Context) {
    return new RegisterSpeaker(
      container.get<SpeakerRepository>(Token.SPEAKER_REPOSITORY),
      container.get<Crypto>(Token.CRYPTO),
      container.get<EventBus>(Token.EVENT_BUS)
    );
  }

  constructor(
    speakerRepository: SpeakerRepository,
    crypto: Crypto,
    eventBus: EventBus
  ) {
    this.speakerRepository = speakerRepository;
    this.crypto = crypto;
    this.eventBus = eventBus;
  }

  async execute({ email, id, password }: RegisterSpeakerParams): Promise<void> {
    await this.ensureSpeakerWithEmailDoesNotAlreadyExists(email);
    await this.ensureIdIsNotAlreadyUsed(id);

    const speaker = Speaker.register(
      id,
      email,
      password,
      await this.crypto.generateSalt()
    );

    await this.speakerRepository.save(speaker);
    await this.eventBus.publish(speaker.pullDomainEvents());
  }

  private async ensureIdIsNotAlreadyUsed(id: SpeakerId) {
    if (await this.speakerRepository.exists(id)) {
      throw new SpeakerAlreadyCreatedError(id);
    }
  }

  private async ensureSpeakerWithEmailDoesNotAlreadyExists(
    email: EmailAddress
  ) {
    if (await this.speakerRepository.existsWith(email)) {
      throw new SpeakerEmailAlreadyUsedError(email);
    }
  }
}
