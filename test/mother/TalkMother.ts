import { Talk } from '../../src/codetalk/talks/domain/Talk'
import { TalkDescription } from '../../src/codetalk/talks/domain/TalkDescription'
import { TalkTitle } from '../../src/codetalk/talks/domain/TalkTitle'
import { EventId } from '../../src/codetalk/shared/domain/models/ids/EventId'
import { SpeakerId } from '../../src/codetalk/shared/domain/models/ids/SpeakerId'
import { TalkId } from '../../src/codetalk/shared/domain/models/ids/TalkId'
import { CODEMOTION } from '../../src/codetalk/shared/infrastructure/fixtures/events'
import { JOYCE_LIN } from '../../src/codetalk/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../src/codetalk/shared/infrastructure/fixtures/talks'

export function createApiTalkId() {
  return new TalkId(API_TALK.id)
}

export function createApiTalk({ id = createApiTalkId(), cospeakers = API_TALK.cospeakers } = {}) {
  return Talk.create(
    id,
    new TalkTitle(API_TALK.title),
    new TalkDescription(API_TALK.description),
    API_TALK.language,
    cospeakers.map(SpeakerId.fromPrimitives),
    new SpeakerId(JOYCE_LIN.id),
    new EventId(CODEMOTION.id)
  )
}
