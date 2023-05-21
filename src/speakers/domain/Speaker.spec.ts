import { Speaker } from './Speaker'
import { CONCHA_ASENSIO, JORGE_AGUIAR } from '../../shared/infrastructure/fixtures/speakers'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { SpeakerName } from './SpeakerName'
import { SpeakerAge } from './SpeakerAge'
import {
  notImportantEmail,
  notImportantPassword,
  notImportantSpeakerId,
} from '../../../test/mother/SpeakerMother/NotImportant'

describe('Speaker', () => {
  const salt = 'salt'

  it('can check if the password is correct', () => {
    const password = new PlainPassword(CONCHA_ASENSIO.password)
    const speaker = Speaker.register(notImportantSpeakerId(), notImportantEmail(), password, salt)

    const samePassword = speaker.has(password)

    expect(samePassword).toBe(true)
  })

  it('can check if the password is not correct', () => {
    const password = new PlainPassword(CONCHA_ASENSIO.password)
    const otherPassword = new PlainPassword(JORGE_AGUIAR.password)
    const speaker = Speaker.register(notImportantSpeakerId(), notImportantEmail(), password, salt)

    const samePassword = speaker.has(otherPassword)

    expect(samePassword).toBe(false)
  })

  it('checks if the name is correct', () => {
    const name = new SpeakerName(CONCHA_ASENSIO.name)
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
    const age = new SpeakerAge(CONCHA_ASENSIO.age)
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
    const language = CONCHA_ASENSIO.language
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
    const name = new SpeakerName(CONCHA_ASENSIO.name)
    const age = new SpeakerAge(CONCHA_ASENSIO.age)
    const language = CONCHA_ASENSIO.language

    speaker.updateProfile(name, age, language)

    expect(speaker.has(name)).toBe(true)
    expect(speaker.has(age)).toBe(true)
    expect(speaker.has(language)).toBe(true)
  })
})
