import { Speaker } from './Speaker'
import {
  notImportantEmail,
  notImportantPassword,
  notImportantSpeakerId,
} from '../../../../test/mother/SpeakerMother/NotImportant'
import { exampleSalt } from '../../../../test/mother/Common'
import {
  paolaAge,
  paolaLanguage,
  paolaName,
  paolaPassword,
} from '../../../../test/mother/SpeakerMother/Paola'
import { PlainPassword } from '../../../shared/domain/models/PlainPassword'

describe('Speaker', () => {
  it('can check if the password is correct', () => {
    const password = paolaPassword()
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      password,
      exampleSalt()
    )

    const samePassword = speaker.has(password)

    expect(samePassword).toBe(true)
  })

  it('can check if the password is not correct', () => {
    const password = paolaPassword()
    const wrongPassword = new PlainPassword('wrong password')
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      password,
      exampleSalt()
    )

    const samePassword = speaker.has(wrongPassword)

    expect(samePassword).toBe(false)
  })

  it('checks if the name is correct', () => {
    const name = paolaName()
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    )

    const sameName = speaker.has(name)

    expect(sameName).toBe(false)
  })

  it('checks if the age is correct', () => {
    const age = paolaAge()
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    )

    const sameAge = speaker.has(age)

    expect(sameAge).toBe(false)
  })

  it('checks if the language is correct', () => {
    const language = paolaLanguage()
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    )

    const sameLanguage = speaker.has(language)

    expect(sameLanguage).toBe(false)
  })

  it('can update the profile', () => {
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    )
    const name = paolaName()
    const age = paolaAge()
    const language = paolaLanguage()

    speaker.updateProfile(name, age, language)

    expect(speaker.has(name)).toBe(true)
    expect(speaker.has(age)).toBe(true)
    expect(speaker.has(language)).toBe(true)
  })
})
