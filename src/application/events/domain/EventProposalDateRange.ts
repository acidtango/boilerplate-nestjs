import { ValueObject } from '../../../shared/domain/hex/ValueObject'

type EventProposalDateRangePrimitives = ReturnType<(typeof EventProposalDateRange)['toPrimitives']>
export class EventProposalDateRange extends ValueObject {
  constructor(private readonly startDate: Date, private readonly deadline: Date) {
    super()
  }

  static fromPrimitives({
    startDate,
    deadline,
  }: EventProposalDateRangePrimitives): EventProposalDateRange {
    return new EventProposalDateRange(startDate, deadline)
  }

  private static toPrimitives(eventProposalDateRange: EventProposalDateRange) {
    return {
      startDate: eventProposalDateRange.startDate,
      deadline: eventProposalDateRange.deadline,
    }
  }

  toPrimitives() {
    return EventProposalDateRange.toPrimitives(this)
  }
}
