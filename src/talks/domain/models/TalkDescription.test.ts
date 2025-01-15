import { describe, expect, it } from 'vitest'
import { TalkDescription } from './TalkDescription.ts'
import { TalkDescriptionTooLongError } from '../errors/TalkDescriptionTooLongError.ts'

describe('TalkDescription', () => {
  it('fails if has more than 300 characters', () => {
    const textWithMoreThan300Characters = 'a'.repeat(1001)

    expect(() => new TalkDescription(textWithMoreThan300Characters)).toThrowError(
      new TalkDescriptionTooLongError()
    )
  })
})
