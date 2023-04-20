import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { Primitives } from '../../../utils/Primitives'
import { EventDateRange } from './EventDateRange'
import { EventId } from './EventId'
import { EventName } from './EventName'
import { EventProposalsDateRange } from './EventProposalsDateRange'

export type TalkEventPrimitives = Primitives<TalkEvent>

export class TalkEvent extends AggregateRoot {
  constructor(
    private readonly eventId: EventId,
    private readonly name: EventName,
    private readonly dateRange: EventDateRange,
    private readonly proposalsDateRange: EventProposalsDateRange
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

  static fromPrimitives(primitives: TalkEventPrimitives) {
    return new TalkEvent(
      EventId.fromPrimitives(primitives.id),
      EventName.fromPrimitives(primitives.name),
      EventDateRange.fromPrimitives(primitives.dateRange),
      EventProposalsDateRange.fromPrimitives(primitives.proposalsDateRange)
    )
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
