import { AggregateAlreadyCreatedError } from '../../../shared/domain/errors/AggregateAlreadyCreatedError'
import { EventId } from '../../../shared/domain/models/ids/EventId'
import { TalkEvent } from '../models/TalkEvent'

export class EventAlreadyCreatedError extends AggregateAlreadyCreatedError {
  constructor(domainId: EventId) {
    super(domainId, TalkEvent.name)
  }
}
