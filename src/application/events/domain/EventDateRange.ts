import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class EventDateRange extends ValueObject {
  static fromPrimitives(startDate: string, endDate: string): EventDateRange {
    return new EventDateRange()
  }
}
