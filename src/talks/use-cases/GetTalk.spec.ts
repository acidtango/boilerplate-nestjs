import { juniorXpId, juniorXpTalk } from '../../../test/mother/TalkMother/JuniorXp'
import { TalkRepositoryFake } from '../../../test/fakes/TalkRepositoryFake'
import { GetTalk } from './GetTalk'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

describe('GetTalk', () => {
  it('returns the talk by id', async () => {
    const expectedTalkId = juniorXpId()
    const talkRepository = TalkRepositoryFake.createWithJuniorXp()
    const getTalk = new GetTalk(talkRepository)

    const speaker = await getTalk.execute(expectedTalkId)

    const expectedSpeaker = juniorXpTalk({ id: expectedTalkId })
    expect(speaker).toEqual(expectedSpeaker)
  })

  it('fails if the talk does not exist', async () => {
    const notExistentId = new TalkId('not-existent-id')
    const talkRepository = TalkRepositoryFake.empty()
    const getSpeakerUseCase = new GetTalk(talkRepository)

    const expectedError = new TalkNotFoundError(notExistentId)
    await expect(getSpeakerUseCase.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
