import { ValueObject } from '../../../shared/domain/hex/ValueObject'
import { TitleTooLongError } from './errors/TitleTooLongError'

export class TalkTitle extends ValueObject {
  private static readonly MAX_LENGTH = 100

  constructor(private readonly title: string) {
    super()
    this.ensureTitleIsNotTooLong()
  }

  private ensureTitleIsNotTooLong() {
    if (this.title.length > TalkTitle.MAX_LENGTH) {
      throw new TitleTooLongError()
    }
  }

  static fromPrimitives(title: string): TalkTitle {
    return new TalkTitle(title)
  }

  toPrimitives() {
    return this.title
  }
}
