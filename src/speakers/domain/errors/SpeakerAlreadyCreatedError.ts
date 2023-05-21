import { AggregateAlreadyCreatedError } from '../../../shared/domain/errors/AggregateAlreadyCreatedError'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { Speaker } from '../models/Speaker'

export class SpeakerAlreadyCreatedError extends AggregateAlreadyCreatedError {
  constructor(speakerId: SpeakerId) {
    super(speakerId, Speaker.name)
  }
}
