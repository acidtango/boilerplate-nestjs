import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class SpeakerAge extends ValueObject {
  constructor(private age: number) {
    super()
  }

  static fromPrimitives(age: number) {
    return new SpeakerAge(age)
  }

  toPrimitives() {
    return this.age
  }
}
