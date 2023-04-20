import { Talk } from '../../src/application/talks/domain/Talk'
import { TalkDescription } from '../../src/application/talks/domain/TalkDescription'
import { TalkTitle } from '../../src/application/talks/domain/TalkTitle'
import { EventId } from '../../src/shared/domain/ids/EventId'
import { SpeakerId } from '../../src/shared/domain/ids/SpeakerId'
import { TalkId } from '../../src/shared/domain/ids/TalkId'
import { CODEMOTION } from '../../src/shared/fixtures/events'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'
import { API_TALK } from '../../src/shared/fixtures/talks'

export function createApiTalkId() {
  return new TalkId(API_TALK.id)
}

export function createApiTalk({ id = createApiTalkId(), cospeakers = API_TALK.cospeakers } = {}) {
  return Talk.create(
    id,
    new TalkTitle(API_TALK.title),
    new TalkDescription(API_TALK.description),
    API_TALK.language,
    cospeakers,
    new SpeakerId(JOYCE_LIN.id),
    new EventId(CODEMOTION.id)
  )
}
