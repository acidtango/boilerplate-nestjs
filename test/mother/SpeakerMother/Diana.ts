import { EmailAddress } from '../../../src/shared/domain/models/EmailAddress'
import { DIANA } from '../../../src/shared/infrastructure/fixtures/speakers'
import { exampleSalt, flushDomainEvents } from '../Common'
import { Speaker } from '../../../src/speakers/domain/models/Speaker'
import { SpeakerId } from '../../../src/shared/domain/models/ids/SpeakerId'
import { PlainPassword } from '../../../src/shared/domain/models/PlainPassword'

export function dianaId() {
  return new SpeakerId(DIANA.id)
}

export function dianaEmail() {
  return new EmailAddress(DIANA.email)
}

export function dianaPassword() {
  return new PlainPassword(DIANA.password)
}

export function dianaSpeakerWithoutProfile() {
  const speaker = Speaker.register(dianaId(), dianaEmail(), dianaPassword(), exampleSalt())

  return flushDomainEvents(speaker)
}
