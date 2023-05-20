import { TalkDescription } from './TalkDescription'
import { TalkDescriptionTooLongError } from './errors/TalkDescriptionTooLongError'

describe('TalkDescription', () => {
  it('fails if has more than 300 characters', () => {
    const textWithMoreThan300Characters = 'a'.repeat(301)

    expect(() => new TalkDescription(textWithMoreThan300Characters)).toThrowError(
      new TalkDescriptionTooLongError()
    )
  })
})
