import { ValueObject } from '../../../shared/domain/models/hex/ValueObject'
import { Primitives } from '../../../shared/domain/models/hex/Primitives'
import { InvalidDateRangeError } from '../errors/InvalidDateRangeError'

type EventDateRangePrimitives = Primitives<EventDateRange>

export class EventDateRange extends ValueObject {
  constructor(
    private readonly startDate: Date,
    private readonly endDate: Date
  ) {
    super()
    if (startDate > endDate) {
      throw new InvalidDateRangeError(startDate, endDate)
    }
  }

  static fromPrimitives({ startDate, endDate }: EventDateRangePrimitives): EventDateRange {
    return new EventDateRange(startDate, endDate)
  }

  private static toPrimitives(eventDateRange: EventDateRange) {
    return { startDate: eventDateRange.startDate, endDate: eventDateRange.endDate }
  }

  toPrimitives() {
    return EventDateRange.toPrimitives(this)
  }
}
