import { TalkTitle } from './TalkTitle'
import { TitleTooLongError } from './errors/TitleTooLongError'

describe('TalkTitle', () => {
  it('fails if has more than 100 characters', () => {
    const textWithMoreThan100Characters = 'a'.repeat(101)

    expect(() => new TalkTitle(textWithMoreThan100Characters)).toThrowError(new TitleTooLongError())
  })
})
