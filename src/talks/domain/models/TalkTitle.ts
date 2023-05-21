import { ValueObject } from '../../../shared/domain/models/hex/ValueObject'
import { TalkTitleTooLongError } from '../errors/TalkTitleTooLongError'

export class TalkTitle extends ValueObject {
  private static readonly MAX_LENGTH = 100

  constructor(private readonly title: string) {
    super()
    this.ensureIsNotTooLong()
  }

  private ensureIsNotTooLong() {
    if (this.title.length > TalkTitle.MAX_LENGTH) {
      throw new TalkTitleTooLongError()
    }
  }

  static fromPrimitives(title: string): TalkTitle {
    return new TalkTitle(title)
  }

  toPrimitives() {
    return this.title
  }
}
