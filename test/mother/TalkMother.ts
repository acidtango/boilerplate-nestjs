import { TalkId } from '../../src/application/talks/domain/TalkId'
import { API_TALK } from '../../src/shared/fixtures/talks'
import { Talk } from '../../src/application/talks/domain/Talk'

export function createApiTalkId() {
  return new TalkId(API_TALK.id)
}

export function createApiTalk({ id = createApiTalkId() } = {}) {
  return new Talk(id)
}
