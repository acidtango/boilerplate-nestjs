import { SpeakerName } from '../../src/application/speakers/domain/SpeakerName'
import { SpeakerAge } from '../../src/application/speakers/domain/SpeakerAge'
import { HAKON_WIUM, JOYCE_LIN } from '../../src/shared/fixtures/speakers'
import { EmailAddress } from '../../src/application/shared/domain/EmailAddress'
import { Speaker } from '../../src/application/speakers/domain/Speaker'

export function createJoyceLinId() {
  return JOYCE_LIN.id
}

export function createJoyceLinSpeaker({ id = createJoyceLinId() } = {}) {
  return new Speaker(
    id,
    new SpeakerName(JOYCE_LIN.name),
    new SpeakerAge(JOYCE_LIN.age),
    JOYCE_LIN.language,
    new EmailAddress(JOYCE_LIN.email),
    true
  )
}

export function createHakonWium({ id = HAKON_WIUM.id } = {}) {
  return new Speaker(
    id,
    new SpeakerName(HAKON_WIUM.name),
    new SpeakerAge(HAKON_WIUM.age),
    HAKON_WIUM.language,
    new EmailAddress(HAKON_WIUM.email),
    true
  )
}
