import { ValueObject } from '../../../shared/domain/hex/ValueObject'

type EventDateRangePrimitives = { startDate: Date; endDate: Date }
export class EventDateRange extends ValueObject {
  constructor(private readonly startDate: Date, private readonly endDate: Date) {
    super()
  }

  static fromPrimitives({ startDate, endDate }: EventDateRangePrimitives): EventDateRange {
    return new EventDateRange(startDate, endDate)
  }

  toPrimitives(): EventDateRangePrimitives {
    return { startDate: this.startDate, endDate: this.endDate }
  }
}
