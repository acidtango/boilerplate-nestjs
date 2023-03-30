import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class EventDateRange extends ValueObject {
  static fromPrimitives(startDate: string, endDate: string): EventDateRange {
    throw new Error('Method not implemented.')
  }
}
