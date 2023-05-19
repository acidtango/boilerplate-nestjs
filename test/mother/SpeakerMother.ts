import { SpeakerId } from '../../src/shared/domain/ids/SpeakerId'
import { SpeakerName } from '../../src/application/speakers/domain/SpeakerName'
import { SpeakerAge } from '../../src/application/speakers/domain/SpeakerAge'
import { HAKON_WIUM, JOYCE_LIN, NOT_IMPORTANT_SPEAKER } from '../../src/shared/fixtures/speakers'
import { EmailAddress } from '../../src/application/shared/domain/EmailAddress'
import { Speaker } from '../../src/application/speakers/domain/Speaker'
import { HashedPassword } from '../../src/application/shared/domain/HashedPassword'
import { PlainPassword } from '../../src/application/shared/domain/PlainPassword'

export function createJoyceLinId() {
  return new SpeakerId(JOYCE_LIN.id)
}

export function notImportantSpeakerId() {
  return new SpeakerId(NOT_IMPORTANT_SPEAKER.id)
}

export function notImportantEmail() {
  return new EmailAddress(NOT_IMPORTANT_SPEAKER.email)
}

export function joyceLinPassword() {
  return new PlainPassword(JOYCE_LIN.password)
}

export function createJoyceLinEmail() {
  return new EmailAddress(JOYCE_LIN.email)
}

export function createJoyceLinSpeaker({
  id = createJoyceLinId(),
  email = createJoyceLinEmail(),
} = {}) {
  return new Speaker(
    id,
    new SpeakerName(JOYCE_LIN.name),
    new SpeakerAge(JOYCE_LIN.age),
    JOYCE_LIN.language,
    email,
    new HashedPassword(''),
    '',
    true
  )
}

export function createHakonWium({ id = new SpeakerId(HAKON_WIUM.id) } = {}) {
  return new Speaker(
    id,
    new SpeakerName(HAKON_WIUM.name),
    new SpeakerAge(HAKON_WIUM.age),
    HAKON_WIUM.language,
    new EmailAddress(HAKON_WIUM.email),
    new HashedPassword(''),
    '',
    true
  )
}
