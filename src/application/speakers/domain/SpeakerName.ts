import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class SpeakerName extends ValueObject {
  constructor(private name: string) {
    super()
  }

  static fromPrimitives(name: string): SpeakerName {
    return new SpeakerName(name)
  }

  toPrimitives() {
    return this.name
  }
}
