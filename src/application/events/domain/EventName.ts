import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class EventName extends ValueObject {
  static fromPrimitives(name: string): EventName {
    throw new Error('Method not implemented.')
  }
}
