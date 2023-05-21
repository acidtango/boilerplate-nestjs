import { Talk } from '../../src/talks/domain/Talk'
import { TalkDescription } from '../../src/talks/domain/TalkDescription'
import { TalkTitle } from '../../src/talks/domain/TalkTitle'
import { EventId } from '../../src/shared/domain/models/ids/EventId'
import { SpeakerId } from '../../src/shared/domain/models/ids/SpeakerId'
import { TalkId } from '../../src/shared/domain/models/ids/TalkId'
import { JSDAY_CANARIAS } from '../../src/shared/infrastructure/fixtures/events'
import { CONCHA_ASENSIO } from '../../src/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../src/shared/infrastructure/fixtures/talks'

export function createApiTalkId() {
  return new TalkId(API_TALK.id)
}

export function createApiTalk({ id = createApiTalkId(), cospeakers = API_TALK.cospeakers } = {}) {
  return Talk.proposal(
    id,
    new TalkTitle(API_TALK.title),
    new TalkDescription(API_TALK.description),
    API_TALK.language,
    cospeakers.map(SpeakerId.fromPrimitives),
    new SpeakerId(CONCHA_ASENSIO.id),
    new EventId(JSDAY_CANARIAS.id)
  )
}
