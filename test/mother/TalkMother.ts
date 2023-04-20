import { TalkId } from '../../src/shared/domain/ids/TalkId'
import { API_TALK } from '../../src/shared/fixtures/talks'
import { Talk } from '../../src/application/talks/domain/Talk'
import { TalkTitle } from '../../src/application/talks/domain/TalkTitle'
import { TalkDescription } from '../../src/application/talks/domain/TalkDescription'
import { EventId } from '../../src/shared/domain/ids/EventId'
import { SpeakerId } from '../../src/shared/domain/ids/SpeakerId'
import { TalkStatus } from '../../src/application/talks/domain/TalkStatus'
import { CODEMOTION } from '../../src/shared/fixtures/events'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'

export function createApiTalkId() {
  return new TalkId(API_TALK.id)
}

export function createApiTalk({ id = createApiTalkId() } = {}) {
  return new Talk(
    id,
    new TalkTitle(API_TALK.title),
    new TalkDescription(API_TALK.description),
    API_TALK.language,
    API_TALK.cospeakers,
    TalkStatus.PROPOSAL,
    new SpeakerId(JOYCE_LIN.id),
    new EventId(CODEMOTION.id)
  )
}
