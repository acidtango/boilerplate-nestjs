import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { Primitives } from '../../../utils/Primitives'
import { EventDateRange } from './EventDateRange'
import { EventId } from './EventId'
import { EventName } from './EventName'
import { EventProposalsDateRange } from './EventProposalsDateRange'

type TalkEventPrimitives = Primitives<TalkEvent>

export class TalkEvent extends AggregateRoot {
  constructor(
    private eventId: EventId,
    private name: EventName,
    private dateRange: EventDateRange,
    private proposalsDateRange: EventProposalsDateRange
  ) {
    super()
  }

  static create(
    id: EventId,
    name: EventName,
    dateRange: EventDateRange,
    proposalsDateRange: EventProposalsDateRange
  ) {
    return new TalkEvent(id, name, dateRange, proposalsDateRange)
  }

  toPrimitives() {
    return {
      id: this.eventId.toPrimitives(),
      name: this.name.toPrimitives(),
      dateRange: this.dateRange.toPrimitives(),
      proposalsDateRange: this.proposalsDateRange.toPrimitives(),
    }
  }
}
