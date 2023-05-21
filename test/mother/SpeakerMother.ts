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
import { PlainPassword } from '../../src/shared/domain/models/PlainPassword'
import { AggregateRoot } from '../../src/shared/domain/models/hex/AggregateRoot'

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

export function conchaSpeakerWithProfile({ id = conchaId(), email = conchaEmail() } = {}) {
  const speaker = conchaSpeakerWithoutProfile()

  speaker.updateProfile(
    new SpeakerName(CONCHA_ASENSIO.name),
    new SpeakerAge(CONCHA_ASENSIO.age),
    CONCHA_ASENSIO.language
  )

  return flushDomainEvents(speaker)
}

export function conchaSpeakerWithoutProfile() {
  const speaker = Speaker.register(conchaId(), conchaEmail(), conchaPassword(), exampleSalt())
  return flushDomainEvents(speaker)
}

function flushDomainEvents<T extends AggregateRoot>(aggregate: T) {
  // pull domain events in order to flush them
  aggregate.pullDomainEvents()
  return aggregate
}
