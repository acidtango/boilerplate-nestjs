import { Talk } from '../../src/application/talks/domain/Talk'
import { EventId } from '../../src/shared/domain/ids/EventId'
import { SpeakerId } from '../../src/shared/domain/ids/SpeakerId'
import { CODEMOTION } from '../../src/shared/fixtures/events'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'
import { API_TALK } from '../../src/shared/fixtures/talks'

export function createApiTalkId() {
  return API_TALK.id
}

export function createApiTalk({ id = createApiTalkId(), cospeakers = API_TALK.cospeakers } = {}) {
  return Talk.create(
    id,
    API_TALK.title,
    API_TALK.description,
    API_TALK.language,
    cospeakers.map(SpeakerId.fromPrimitives),
    new SpeakerId(JOYCE_LIN.id),
    new EventId(CODEMOTION.id)
  )
}
