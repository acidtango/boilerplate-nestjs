import { ValueObject } from '../../../shared/domain/models/hex/ValueObject'
import { UnderageSpeakerError } from '../errors/UnderageSpeakerError'

export class SpeakerAge extends ValueObject {
  static fromPrimitives(age: number) {
    return new SpeakerAge(age)
  }

  constructor(private readonly age: number) {
    super()
    this.ensureIsNotUnderAge()
  }

  private ensureIsNotUnderAge() {
    if (this.age < 18) {
      throw new UnderageSpeakerError(this.age)
    }
  }

  equalsTo(value: SpeakerAge) {
    return this.age === value.age
  }

  toPrimitives() {
    return this.age
  }
}
