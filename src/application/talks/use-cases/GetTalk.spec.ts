import { createApiTalk, createApiTalkId } from '../../../../test/mother/TalkMother'
import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { GetTalk } from './GetTalk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

describe('GetTalk', () => {
  it('returns the talk by id', async () => {
    const expectedTalkId = createApiTalkId()
    const talkRepository = TalkRepositoryFake.createWithApiTalk()
    const getTalk = new GetTalk(talkRepository)

    const speaker = await getTalk.execute(expectedTalkId)

    const expectedSpeaker = createApiTalk({ id: expectedTalkId })
    expect(speaker).toEqual(expectedSpeaker)
  })

  it('fails if the talk does not exist', async () => {
    const notExistentId = 'not-existent-id'
    const talkRepository = TalkRepositoryFake.empty()
    const getSpeakerUseCase = new GetTalk(talkRepository)

    const expectedError = new TalkNotFoundError(notExistentId)
    await expect(getSpeakerUseCase.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
