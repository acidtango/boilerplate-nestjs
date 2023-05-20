import { Speaker } from './Speaker'
import {
  notImportantEmail,
  notImportantPassword,
  notImportantSpeakerId,
} from '../../../test/mother/SpeakerMother'
import { HAKON_WIUM, JOYCE_LIN } from '../../shared/infrastructure/fixtures/speakers'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { SpeakerName } from './SpeakerName'
import { SpeakerAge } from './SpeakerAge'

describe('Speaker', () => {
  const salt = 'salt'

  it('can check if the password is correct', () => {
    const password = new PlainPassword(JOYCE_LIN.password)
    const speaker = Speaker.register(notImportantSpeakerId(), notImportantEmail(), password, salt)

    const samePassword = speaker.has(password)

    expect(samePassword).toBe(true)
  })

  it('can check if the password is not correct', () => {
    const password = new PlainPassword(JOYCE_LIN.password)
    const otherPassword = new PlainPassword(HAKON_WIUM.password)
    const speaker = Speaker.register(notImportantSpeakerId(), notImportantEmail(), password, salt)

    const samePassword = speaker.has(otherPassword)

    expect(samePassword).toBe(false)
  })

  it('checks if the name is correct', () => {
    const name = new SpeakerName(JOYCE_LIN.name)
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      salt
    )

    const sameName = speaker.has(name)

    expect(sameName).toBe(false)
  })

  it('checks if the age is correct', () => {
    const age = new SpeakerAge(JOYCE_LIN.age)
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      salt
    )

    const sameAge = speaker.has(age)

    expect(sameAge).toBe(false)
  })

  it('checks if the language is correct', () => {
    const language = JOYCE_LIN.language
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      salt
    )

    const sameLanguage = speaker.has(language)

    expect(sameLanguage).toBe(false)
  })

  it('can update the profile', () => {
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      salt
    )
    const name = new SpeakerName(JOYCE_LIN.name)
    const age = new SpeakerAge(JOYCE_LIN.age)
    const language = JOYCE_LIN.language

    speaker.updateProfile(name, age, language)

    expect(speaker.has(name)).toBe(true)
    expect(speaker.has(age)).toBe(true)
    expect(speaker.has(language)).toBe(true)
  })
})
