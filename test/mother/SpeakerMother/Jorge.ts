import { EmailAddress } from '../../../src/shared/domain/models/EmailAddress'
import { JORGE_AGUIAR } from '../../../src/shared/infrastructure/fixtures/speakers'
import { exampleSalt, flushDomainEvents } from '../Common'
import { Speaker } from '../../../src/speakers/domain/models/Speaker'
import { SpeakerId } from '../../../src/shared/domain/models/ids/SpeakerId'
import { PlainPassword } from '../../../src/shared/domain/models/PlainPassword'

export function jorgeId() {
  return new SpeakerId(JORGE_AGUIAR.id)
}

export function jorgeEmail() {
  return new EmailAddress(JORGE_AGUIAR.email)
}

export function jorgePassword() {
  return new PlainPassword(JORGE_AGUIAR.password)
}

export function jorgeSpeakerWithoutProfile() {
  const speaker = Speaker.register(jorgeId(), jorgeEmail(), jorgePassword(), exampleSalt())

  return flushDomainEvents(speaker)
}
