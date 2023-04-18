import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class TalkDescription extends ValueObject {
  constructor(private description: string) {
    super()
  }

  static fromPrimitives(description: string): TalkDescription {
    return new TalkDescription(description)
  }

  toPrimitives() {
    return this.description
  }
}
