import { ValueObject } from '../../../shared/domain/hex/ValueObject'
import { Primitives } from '../../../utils/Primitives'

type EventProposalDateRangePrimitives = Primitives<EventProposalsDateRange>

export class EventProposalsDateRange extends ValueObject {
  constructor(private readonly startDate: Date, private readonly deadline: Date) {
    super()
  }

  static fromPrimitives({
    startDate,
    deadline,
  }: EventProposalDateRangePrimitives): EventProposalsDateRange {
    return new EventProposalsDateRange(startDate, deadline)
  }

  private static toPrimitives(eventProposalsDateRange: EventProposalsDateRange) {
    return {
      startDate: eventProposalsDateRange.startDate,
      deadline: eventProposalsDateRange.deadline,
    }
  }

  toPrimitives() {
    return EventProposalsDateRange.toPrimitives(this)
  }
}
