import { ValueObject } from '../../../shared/domain/models/hex/ValueObject.ts'

export class EventName extends ValueObject {
  private readonly name: string

  constructor(name: string) {
    super()
    this.name = name
  }

  static fromPrimitives(name: string): EventName {
    return new EventName(name)
  }

  toPrimitives() {
    return this.name
  }
}
