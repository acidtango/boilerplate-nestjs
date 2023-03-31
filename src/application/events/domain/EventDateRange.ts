import { ValueObject } from '../../../shared/domain/hex/ValueObject'

type EventDateRangePrimitives = ReturnType<(typeof EventDateRange)['toPrimitives']>
export class EventDateRange extends ValueObject {
  constructor(private readonly startDate: Date, private readonly endDate: Date) {
    super()
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
