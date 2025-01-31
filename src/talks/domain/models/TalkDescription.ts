import { ValueObject } from '../../../shared/domain/models/hex/ValueObject.ts'
import { TalkDescriptionTooLongError } from '../errors/TalkDescriptionTooLongError.ts'

export class TalkDescription extends ValueObject {
  private static readonly MAX_LENGTH = 1000

  private readonly description: string

  constructor(description: string) {
    super()
    this.description = description
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
