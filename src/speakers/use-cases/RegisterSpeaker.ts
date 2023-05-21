import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { EmailAddress } from '../../shared/domain/models/EmailAddress'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { SpeakerRepository } from '../domain/repositories/SpeakerRepository'
import { Inject } from '@nestjs/common'
import { Token } from '../../shared/domain/services/Token'
import { Speaker } from '../domain/models/Speaker'
import { EventBus } from '../../shared/domain/models/hex/EventBus'
import { Crypto } from '../../shared/domain/services/Crypto'
import { SpeakerEmailAlreadyUsedError } from '../domain/errors/SpeakerEmailAlreadyUsedError'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'

export type RegisterSpeakerParams = {
  id: SpeakerId
  email: EmailAddress
  password: PlainPassword
}

export class RegisterSpeaker {
  constructor(
    @Inject(Token.SPEAKER_REPOSITORY) private readonly speakerRepository: SpeakerRepository,
    @Inject(Token.CRYPTO) private readonly crypto: Crypto,
    @Inject(Token.EVENT_BUS) private readonly eventBus: EventBus
  ) {}

  async execute({ email, id, password }: RegisterSpeakerParams): Promise<void> {
    await this.ensureSpeakerWithEmailDoesNotAlreadyExists(email)
    await this.ensureIdIsNotAlreadyUsed(id)

    const speaker = Speaker.register(id, email, password, await this.crypto.generateSalt())

    await this.speakerRepository.save(speaker)
    await this.eventBus.publish(speaker.pullDomainEvents())
  }

  private async ensureIdIsNotAlreadyUsed(id: SpeakerId) {
    if (await this.speakerRepository.exists(id)) {
      throw new SpeakerAlreadyCreatedError(id)
    }
  }

  private async ensureSpeakerWithEmailDoesNotAlreadyExists(email: EmailAddress) {
    if (await this.speakerRepository.existsWith(email)) {
      throw new SpeakerEmailAlreadyUsedError(email)
    }
  }
}
