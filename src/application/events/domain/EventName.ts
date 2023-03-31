import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class EventName extends ValueObject {
  static fromPrimitives(name: string): EventName {
    return new EventName(name)
  }

  constructor(private name: string) {
    super()
  }

  toPrimitives() {
    return this.name
  }
}
