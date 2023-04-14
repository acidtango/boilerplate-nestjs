import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class EventName extends ValueObject {
  constructor(private name: string) {
    super()
  }

  static fromPrimitives(name: string): EventName {
    return new EventName(name)
  }

  toPrimitives() {
    return this.name
  }
}
