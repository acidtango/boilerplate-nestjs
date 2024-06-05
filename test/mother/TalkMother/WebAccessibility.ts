import { TalkId } from '../../../src/shared/domain/models/ids/TalkId'
import { WEB_ACCESSIBILITY } from '../../../src/shared/infrastructure/fixtures/talks'
import { Talk } from '../../../src/talks/domain/models/Talk'
import { TalkTitle } from '../../../src/talks/domain/models/TalkTitle'
import { TalkDescription } from '../../../src/talks/domain/models/TalkDescription'
import { SpeakerId } from '../../../src/shared/domain/models/ids/SpeakerId'
import { EventId } from '../../../src/shared/domain/models/ids/EventId'
import { flushDomainEvents } from '../Common'

export function webAccessibilityId() {
  return new TalkId(WEB_ACCESSIBILITY.id)
}

export function webAccessibilityTalk({ id = webAccessibilityId() } = {}) {
  const talk = Talk.proposal(
    id,
    new TalkTitle(WEB_ACCESSIBILITY.title),
    new TalkDescription(WEB_ACCESSIBILITY.description),
    WEB_ACCESSIBILITY.language,
    [],
    new SpeakerId(WEB_ACCESSIBILITY.id),
    new EventId(WEB_ACCESSIBILITY.id)
  )

  return flushDomainEvents(talk)
}
