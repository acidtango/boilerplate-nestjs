import { ValueObject } from '../../../shared/domain/models/hex/ValueObject.ts'
import { TalkTitleTooLongError } from '../errors/TalkTitleTooLongError.ts'

export class TalkTitle extends ValueObject {
  private static readonly MAX_LENGTH = 100

  private readonly title: string

  constructor(title: string) {
    super()
    this.title = title
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
