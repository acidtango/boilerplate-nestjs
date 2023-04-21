import { AggregateAlreadyCreatedError } from '../../../../shared/domain/errors/AggregateAlreadyCreatedError'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { Speaker } from '../Speaker'

export class SpeakerAlreadyCreatedError extends AggregateAlreadyCreatedError {
  constructor(speakerId: SpeakerId) {
    super(speakerId, Speaker.name)
  }
}
