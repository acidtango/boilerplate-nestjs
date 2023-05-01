import { Talk } from '../../src/application/talks/domain/Talk'
import { CODEMOTION } from '../../src/shared/fixtures/events'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'
import { API_TALK } from '../../src/shared/fixtures/talks'

export function createApiTalkId() {
  return API_TALK.id
}

export function createApiTalk({
  id = createApiTalkId(),
  cospeakers = API_TALK.cospeakers,
} = {}): Talk {
  return {
    id: id,
    title: API_TALK.title,
    description: API_TALK.description,
    language: API_TALK.language,
    cospeakers,
    speakerId: JOYCE_LIN.id,
    eventId: CODEMOTION.id,
  }
}
