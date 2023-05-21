import { TalkId } from '../../../src/shared/domain/models/ids/TalkId'
import { IMPROVING_TESTS } from '../../../src/shared/infrastructure/fixtures/talks'
import { Talk } from '../../../src/talks/domain/models/Talk'
import { TalkTitle } from '../../../src/talks/domain/models/TalkTitle'
import { TalkDescription } from '../../../src/talks/domain/models/TalkDescription'
import { SpeakerId } from '../../../src/shared/domain/models/ids/SpeakerId'
import { EventId } from '../../../src/shared/domain/models/ids/EventId'
import { flushDomainEvents } from '../Common'

export function improvingTestsId() {
  return new TalkId(IMPROVING_TESTS.id)
}

export function improvingTestsTalk({ id = improvingTestsId() } = {}) {
  const talk = Talk.proposal(
    id,
    new TalkTitle(IMPROVING_TESTS.title),
    new TalkDescription(IMPROVING_TESTS.description),
    IMPROVING_TESTS.language,
    [],
    new SpeakerId(IMPROVING_TESTS.id),
    new EventId(IMPROVING_TESTS.id)
  )

  return flushDomainEvents(talk)
}
