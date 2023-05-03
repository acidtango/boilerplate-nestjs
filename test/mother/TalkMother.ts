import { Talk } from '../../src/application/talks/domain/Talk'
import { CODEMOTION } from '../../src/shared/fixtures/events'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'
import { API_TALK } from '../../src/shared/fixtures/talks'

export function createApiTalkId() {
  return API_TALK.id
}

export function createApiTalk({ id = createApiTalkId(), cospeakers = API_TALK.cospeakers } = {}) {
  return new Talk(
    id,
    API_TALK.title,
    API_TALK.description,
    API_TALK.language,
    cospeakers,
    JOYCE_LIN.id,
    CODEMOTION.id
  )
}
