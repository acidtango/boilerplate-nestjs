import { Speaker } from '../../../src/speakers/domain/models/Speaker'
import { SpeakerId } from '../../../src/shared/domain/models/ids/SpeakerId'
import { PAOLA } from '../../../src/shared/infrastructure/fixtures/speakers'
import { EmailAddress } from '../../../src/shared/domain/models/EmailAddress'
import { SpeakerName } from '../../../src/speakers/domain/models/SpeakerName'
import { SpeakerAge } from '../../../src/speakers/domain/models/SpeakerAge'
import { PlainPassword } from '../../../src/shared/domain/models/PlainPassword'
import { exampleSalt, flushDomainEvents } from '../Common'

export function paolaId() {
  return new SpeakerId(PAOLA.id)
}

export function paolaPassword() {
  return new PlainPassword(PAOLA.password)
}

export function paolaEmail() {
  return new EmailAddress(PAOLA.email)
}

export function paolaSpeakerWithoutProfile({ id = paolaId(), email = paolaEmail() } = {}) {
  const speaker = Speaker.register(id, email, paolaPassword(), exampleSalt())

  return flushDomainEvents(speaker)
}

export function paolaName() {
  return new SpeakerName(PAOLA.name)
}

export function paolaAge() {
  return new SpeakerAge(PAOLA.age)
}

export function paolaLanguage() {
  return PAOLA.language
}

export function paolaSpeaker({ id = paolaId(), email = paolaEmail() } = {}) {
  const speaker = paolaSpeakerWithoutProfile({ id, email })

  speaker.updateProfile(paolaName(), paolaAge(), paolaLanguage())

  return flushDomainEvents(speaker)
}
