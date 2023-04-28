import { AggregateAlreadyCreatedError } from '../../../../shared/domain/errors/AggregateAlreadyCreatedError'
import { TalkEvent } from '../TalkEvent'
import { DomainId } from '../../../../shared/domain/hex/DomainId'

export class EventAlreadyCreatedError extends AggregateAlreadyCreatedError {
  constructor(domainId: string) {
    super(new DomainId(domainId), TalkEvent.name)
  }
}
