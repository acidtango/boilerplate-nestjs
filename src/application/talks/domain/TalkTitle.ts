import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class TalkTitle extends ValueObject {
  constructor(private title: string) {
    super()
  }

  static fromPrimitives(title: string): TalkTitle {
    return new TalkTitle(title)
  }

  toPrimitives() {
    return this.title
  }
}
