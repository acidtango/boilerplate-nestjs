import { ValueObject } from "../../../shared/domain/models/hex/ValueObject.ts";
import { UnderageSpeakerError } from "../errors/UnderageSpeakerError.ts";

export class SpeakerAge extends ValueObject {
  static fromPrimitives(age: number) {
    return new SpeakerAge(age);
  }

  private readonly age: number;

  constructor(age: number) {
    super();
    this.age = age;
    this.ensureIsNotUnderAge();
  }

  private ensureIsNotUnderAge() {
    if (this.age < 18) {
      throw new UnderageSpeakerError(this.age);
    }
  }

  equalsTo(value: SpeakerAge) {
    return this.age === value.age;
  }

  toPrimitives() {
    return this.age;
  }
}
