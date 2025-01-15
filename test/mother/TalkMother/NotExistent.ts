import { TalkId } from '../../../src/shared/domain/models/ids/TalkId.ts'

export function nonExistingTalkId() {
  return new TalkId('non-existing-talk-id')
}
