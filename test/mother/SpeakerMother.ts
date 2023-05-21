import { SpeakerId } from '../../src/shared/domain/models/ids/SpeakerId'
import { SpeakerName } from '../../src/speakers/domain/SpeakerName'
import { SpeakerAge } from '../../src/speakers/domain/SpeakerAge'
import {
  CONCHA_ASENSIO,
  JORGE_AGUIAR,
  NOT_IMPORTANT_SPEAKER,
} from '../../src/shared/infrastructure/fixtures/speakers'
import { EmailAddress } from '../../src/shared/domain/models/EmailAddress'
import { Speaker } from '../../src/speakers/domain/Speaker'
import { HashedPassword } from '../../src/shared/domain/models/HashedPassword'
import { PlainPassword } from '../../src/shared/domain/models/PlainPassword'

export function conchaId() {
  return new SpeakerId(CONCHA_ASENSIO.id)
}

export function notImportantSpeakerId() {
  return new SpeakerId(NOT_IMPORTANT_SPEAKER.id)
}

export function notImportantEmail() {
  return new EmailAddress(NOT_IMPORTANT_SPEAKER.email)
}

export function notImportantName() {
  return new SpeakerName(NOT_IMPORTANT_SPEAKER.name)
}

export function notImportantAge() {
  return new SpeakerAge(NOT_IMPORTANT_SPEAKER.age)
}

export function notImportantLanguage() {
  return NOT_IMPORTANT_SPEAKER.language
}

export function conchaPassword() {
  return new PlainPassword(CONCHA_ASENSIO.password)
}

export function jorgePassword() {
  return new EmailAddress(JORGE_AGUIAR.email)
}

export function conchaEmail() {
  return new EmailAddress(CONCHA_ASENSIO.email)
}

export function notImportantPassword() {
  return new PlainPassword(NOT_IMPORTANT_SPEAKER.password)
}

export function exampleSalt() {
  return 'salt'
}

export function conchaSpeakerWithProfile() {
  const speaker = conchaSpeakerWithoutProfile()

  speaker.updateProfile(
    new SpeakerName(CONCHA_ASENSIO.name),
    new SpeakerAge(CONCHA_ASENSIO.age),
    CONCHA_ASENSIO.language
  )

  return speaker
}

export function conchaSpeakerWithoutProfile() {
  return Speaker.register(conchaId(), conchaEmail(), conchaPassword(), exampleSalt())
}

/**
 * @deprecated use other factories
 */
export function conchaSpeaker_DEPRECATED({ id = conchaId(), email = conchaEmail() } = {}) {
  return new Speaker(
    id,
    new SpeakerName(CONCHA_ASENSIO.name),
    new SpeakerAge(CONCHA_ASENSIO.age),
    CONCHA_ASENSIO.language,
    email,
    new HashedPassword(
      'd1384113f686c185232b76d7d419e4ebbfb123f607023f94936c762b3d45234ee32cf88d45a110a4024ca8abcdee3bba6e97f9cf1b3d6b9270a95250c28be432'
    ),
    exampleSalt(),
    true
  )
}
