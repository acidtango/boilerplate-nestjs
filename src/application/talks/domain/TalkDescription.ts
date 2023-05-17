import { ValueObject } from '../../../shared/domain/hex/ValueObject'
import { TalkDescriptionTooLongError } from './errors/TalkDescriptionTooLongError'

export class TalkDescription extends ValueObject {
  private static readonly MAX_LENGTH = 300

  constructor(private readonly description: string) {
    super()
    this.ensureIsNotTooLong()
  }

  private ensureIsNotTooLong() {
    if (this.description.length > TalkDescription.MAX_LENGTH) {
      throw new TalkDescriptionTooLongError()
    }
  }

  static fromPrimitives(description: string): TalkDescription {
    return new TalkDescription(description)
  }

  toPrimitives() {
    return this.description
  }
}
