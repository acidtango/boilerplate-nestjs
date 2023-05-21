import { SpeakerAge } from './SpeakerAge'
import { UnderageSpeakerError } from '../errors/UnderageSpeakerError'

describe('SpeakerAge', () => {
  it('does not fail if user is not under-age', () => {
    expect(() => new SpeakerAge(18)).not.toThrow()
  })

  it('fails if user is under-age', () => {
    const underageSpeakerError = new UnderageSpeakerError(12)
    expect(() => new SpeakerAge(12)).toThrowError(underageSpeakerError)
  })
})
