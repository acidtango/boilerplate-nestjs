import { ValueObject } from '../../../shared/domain/models/hex/ValueObject.ts'
import type { Primitives } from '../../../shared/domain/models/hex/Primitives.ts'
import { InvalidDateRangeError } from '../errors/InvalidDateRangeError.ts'

type EventProposalDateRangePrimitives = Primitives<EventProposalsDateRange>

export class EventProposalsDateRange extends ValueObject {
  private readonly startDate: Date

  private readonly deadline: Date

  constructor(startDate: Date, deadline: Date) {
    super()
    this.deadline = deadline
    this.startDate = startDate
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
