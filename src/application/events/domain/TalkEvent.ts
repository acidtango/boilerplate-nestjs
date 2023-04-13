import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { EventId } from './EventId'

export class TalkEvent extends AggregateRoot {
  constructor(eventId: EventId) {
    super()
  }

  toPrimitives() {}
}
