import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { Language } from '../../shared/domain/models/Language'
import { SpeakerAge } from '../domain/SpeakerAge'
import { SpeakerName } from '../domain/SpeakerName'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { EventBusNoopFake } from '../../../test/fakes/EventBusFake'

export type UpdateSpeakerProfileParams = {
  id: SpeakerId
  name: SpeakerName
  age: SpeakerAge
  language: Language
}

export class UpdateSpeakerProfile extends UseCase {
  constructor(speakerRepository: SpeakerRepositoryFake, eventBus: EventBusNoopFake) {
    super()
  }

  async execute(params: UpdateSpeakerProfileParams) {}
}
