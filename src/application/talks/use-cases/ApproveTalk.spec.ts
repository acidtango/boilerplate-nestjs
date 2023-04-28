import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { createApiTalkId } from '../../../../test/mother/TalkMother'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'
import { ApproveTalk } from './ApproveTalk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

describe('ApproveTalk', () => {
  it('fails if the talk is in PROPOSAL', async () => {
    const talkRepository = TalkRepositoryFake.createWithApiTalk()
    const approveTalk = new ApproveTalk(talkRepository)

    await expect(() => approveTalk.execute(createApiTalkId())).rejects.toThrowError(
      new TalkCannotBeApprovedError()
    )
  })

  it('fails if the talk does not exist', async () => {
    const notExistentId = 'not-existent-id'
    const talkRepository = TalkRepositoryFake.empty()
    const expectedError = new TalkNotFoundError(notExistentId)
    const approveTalk = new ApproveTalk(talkRepository)

    await expect(() => approveTalk.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
