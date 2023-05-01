import { createApiTalk, createApiTalkId } from '../../../../test/mother/TalkMother'
import { GetTalk } from './GetTalk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { createMongoClientMemory } from '../../shared/infrastructure/createMongoClientMemory'

describe('GetTalk', () => {
  it('returns the talk by id', async () => {
    const expectedTalkId = createApiTalkId()
    const mongoClient = createMongoClientMemory(createApiTalk())
    const getTalk = new GetTalk(mongoClient)

    const speaker = await getTalk.execute(expectedTalkId)

    const expectedSpeaker = createApiTalk({ id: expectedTalkId })
    expect(speaker).toEqual(expectedSpeaker)
  })

  it('fails if the talk does not exist', async () => {
    const notExistentId = 'not-existent-id'
    const mongoClient = createMongoClientMemory()
    const getSpeakerUseCase = new GetTalk(mongoClient)

    const expectedError = new TalkNotFoundError(notExistentId)
    await expect(getSpeakerUseCase.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
