import { ValueObject } from '../../../shared/domain/hex/ValueObject'
import { UnderageSpeakerError } from './errors/UnderageSpeakerError'

export class SpeakerAge extends ValueObject {
  constructor(private readonly age: number) {
    super()
    this.ensureIsNotUnderAge()
  }

  private ensureIsNotUnderAge() {
    if (this.age < 18) {
      throw new UnderageSpeakerError(this.age)
    }
  }

  static fromPrimitives(age: number) {
    return new SpeakerAge(age)
  }

  toPrimitives() {
    return this.age
  }
}
