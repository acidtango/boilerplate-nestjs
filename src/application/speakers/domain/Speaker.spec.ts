import { Speaker } from './Speaker'
import { notImportantEmail, notImportantSpeakerId } from '../../../../test/mother/SpeakerMother'
import { HAKON_WIUM, JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { PlainPassword } from '../../shared/domain/PlainPassword'

describe('Speaker', () => {
  it('can check if the password is correct', () => {
    const password = new PlainPassword(JOYCE_LIN.password)
    const salt = 'salt'
    const speaker = Speaker.register(notImportantSpeakerId(), notImportantEmail(), password, salt)

    const samePassword = speaker.has(password)

    expect(samePassword).toBe(true)
  })

  it('can check if the password is not correct', () => {
    const password = new PlainPassword(JOYCE_LIN.password)
    const otherPassword = new PlainPassword(HAKON_WIUM.password)
    const salt = 'salt'
    const speaker = Speaker.register(notImportantSpeakerId(), notImportantEmail(), password, salt)

    const samePassword = speaker.has(otherPassword)

    expect(samePassword).toBe(false)
  })
})
