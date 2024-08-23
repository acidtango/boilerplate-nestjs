import { AggregateRoot } from '../../../shared/domain/models/hex/AggregateRoot.ts'
import type { Primitives } from '../../../shared/domain/models/hex/Primitives.ts'
import { EventDateRange } from './EventDateRange.ts'
import { EventId } from '../../../shared/domain/models/ids/EventId.ts'
import { EventName } from './EventName.ts'
import { EventProposalsDateRange } from './EventProposalsDateRange.ts'

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
