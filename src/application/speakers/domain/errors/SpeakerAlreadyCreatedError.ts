import { AggregateAlreadyCreatedError } from '../../../../shared/domain/errors/AggregateAlreadyCreatedError'
import { Speaker } from '../Speaker'
import { DomainId } from '../../../../shared/domain/hex/DomainId'

export class SpeakerAlreadyCreatedError extends AggregateAlreadyCreatedError {
  constructor(speakerId: string) {
    super(new DomainId(speakerId), Speaker.name)
  }
}
