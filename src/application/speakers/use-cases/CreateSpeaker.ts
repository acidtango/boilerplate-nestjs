import { UseCase } from '../../../shared/domain/hex/UseCase'
import { EmailAddress } from '../../shared/domain/EmailAddress'
import { Language } from '../../shared/domain/Language'
import { SpeakerAge } from '../domain/SpeakerAge'
import { SpeakerId } from '../domain/SpeakerId'
import { SpeakerName } from '../domain/SpeakerName'

type CreateSpeakerParams = {
  id: SpeakerId
  name: SpeakerName
  age: SpeakerAge
  language: Language
  email: EmailAddress
}

export class CreateSpeaker extends UseCase {
  async execute(params: CreateSpeakerParams) {}
}
