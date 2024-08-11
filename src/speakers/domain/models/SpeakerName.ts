import { ValueObject } from "../../../shared/domain/models/hex/ValueObject.ts";

export class SpeakerName extends ValueObject {
  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  static fromPrimitives(name: string): SpeakerName {
    return new SpeakerName(name);
  }

  toPrimitives() {
    return this.name;
  }

  equalsTo(otherName: SpeakerName) {
    return this.name === otherName.name;
  }
}
