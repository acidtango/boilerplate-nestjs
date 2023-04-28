import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { AppProvider } from '../../AppProviders'
import { EmailAddress } from '../../shared/domain/EmailAddress'
import { Language } from '../../shared/domain/Language'
import { Speaker } from '../domain/Speaker'
import { SpeakerAge } from '../domain/SpeakerAge'
import { SpeakerName } from '../domain/SpeakerName'
import { SpeakerRepository } from '../domain/SpeakerRepository'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'

export type CreateSpeakerParams = {
  id: string
  name: SpeakerName
  age: SpeakerAge
  language: Language
  email: EmailAddress
}

@Injectable()
export class CreateSpeaker extends UseCase {
  constructor(
    @Inject(AppProvider.SPEAKER_REPOSITORY) private readonly speakerRepository: SpeakerRepository
  ) {
    super()
  }

  async execute({ age, email, id, language, name }: CreateSpeakerParams) {
    if (await this.speakerRepository.exists(id)) {
      throw new SpeakerAlreadyCreatedError(id)
    }

    const speaker = Speaker.create(id, name, age, language, email)

    await this.speakerRepository.save(speaker)
  }
}
