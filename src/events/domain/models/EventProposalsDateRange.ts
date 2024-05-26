import { ValueObject } from '../../../shared/domain/models/hex/ValueObject'
import { Primitives } from '../../../shared/domain/models/hex/Primitives'
import { InvalidDateRangeError } from '../errors/InvalidDateRangeError'

type EventProposalDateRangePrimitives = Primitives<EventProposalsDateRange>

export class EventProposalsDateRange extends ValueObject {
  constructor(
    private readonly startDate: Date,
    private readonly deadline: Date
  ) {
    super()
    if (startDate > deadline) {
      throw new InvalidDateRangeError(startDate, deadline)
    }
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
