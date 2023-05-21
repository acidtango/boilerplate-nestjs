import { TalkId } from '../../../src/shared/domain/models/ids/TalkId'

export function nonExistingTalkId() {
  return new TalkId('non-existing-talk-id')
}
