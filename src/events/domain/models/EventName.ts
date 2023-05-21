import { ValueObject } from '../../../shared/domain/models/hex/ValueObject'

export class EventName extends ValueObject {
  constructor(private readonly name: string) {
    super()
  }

  static fromPrimitives(name: string): EventName {
    return new EventName(name)
  }

  toPrimitives() {
    return this.name
  }
}
