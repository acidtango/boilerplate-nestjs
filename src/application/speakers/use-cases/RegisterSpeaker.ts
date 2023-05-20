import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { EmailAddress } from '../../shared/domain/models/EmailAddress'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { SpeakerRepository } from '../domain/SpeakerRepository'
import { Inject } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { Speaker } from '../domain/Speaker'
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
    @Inject(AppProvider.SPEAKER_REPOSITORY) private readonly speakerRepository: SpeakerRepository,
    @Inject(AppProvider.CRYPTO) private readonly crypto: Crypto,
    @Inject(AppProvider.EVENT_BUS) private readonly eventBus: EventBus
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
