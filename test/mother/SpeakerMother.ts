import { SpeakerId } from '../../src/codetalk/shared/domain/models/ids/SpeakerId'
import { SpeakerName } from '../../src/codetalk/speakers/domain/SpeakerName'
import { SpeakerAge } from '../../src/codetalk/speakers/domain/SpeakerAge'
import {
  HAKON_WIUM,
  JOYCE_LIN,
  NOT_IMPORTANT_SPEAKER,
} from '../../src/codetalk/shared/infrastructure/fixtures/speakers'
import { EmailAddress } from '../../src/codetalk/shared/domain/models/EmailAddress'
import { Speaker } from '../../src/codetalk/speakers/domain/Speaker'
import { HashedPassword } from '../../src/codetalk/shared/domain/models/HashedPassword'
import { PlainPassword } from '../../src/codetalk/shared/domain/models/PlainPassword'

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

export function createHakonEmail() {
  return new EmailAddress(HAKON_WIUM.email)
}

export function createJoyceLinEmail() {
  return new EmailAddress(JOYCE_LIN.email)
}

export function createJoyceLinPassword() {
  return new PlainPassword(JOYCE_LIN.password)
}

export function createNotImportantPassword() {
  return new PlainPassword(NOT_IMPORTANT_SPEAKER.password)
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
    new HashedPassword(
      'b83fc3c0cb5cf813b220d30737777cf38beb4c4edc9d63a77a54f387edffc14980e5fe527b56b69e1e13f5930e5231196d22126220c72312a4bd00300454d18b'
    ),
    'salt',
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
