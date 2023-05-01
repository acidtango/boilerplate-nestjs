import { createApiTalk, createApiTalkId } from '../../../../test/mother/TalkMother'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'
import { ApproveTalk } from './ApproveTalk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { createMongoClientMemory } from '../../shared/infrastructure/createMongoClientMemory'

describe('ApproveTalk', () => {
  it('fails if the talk is in PROPOSAL', async () => {
    const mongoClient = createMongoClientMemory(createApiTalk())
    const approveTalk = new ApproveTalk(mongoClient)

    await expect(() => approveTalk.execute(createApiTalkId())).rejects.toThrowError(
      new TalkCannotBeApprovedError()
    )
  })

  it('fails if the talk does not exist', async () => {
    const notExistentId = 'not-existent-id'
    const mongoClient = createMongoClientMemory()
    const expectedError = new TalkNotFoundError(notExistentId)
    const approveTalk = new ApproveTalk(mongoClient)

    await expect(() => approveTalk.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
