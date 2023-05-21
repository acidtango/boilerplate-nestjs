import { TalkRepositoryFake } from '../../../test/fakes/TalkRepositoryFake'
import { juniorXpId, juniorXpTalkReviewed } from '../../../test/mother/TalkMother/JuniorXp'
import { TalkStatus } from '../domain/models/TalkStatus'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'
import { ApproveTalk } from './ApproveTalk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import {
  improvingTestsId,
  improvingTestsTalk,
} from '../../../test/mother/TalkMother/ImprovingTests'
import { nonExistingTalkId } from '../../../test/mother/TalkMother/NotExistent'

describe('ApproveTalk', () => {
  let talkRepository: TalkRepositoryFake
  let approveTalk: ApproveTalk

  beforeEach(() => {
    talkRepository = TalkRepositoryFake.createWith(juniorXpTalkReviewed(), improvingTestsTalk())
    approveTalk = new ApproveTalk(talkRepository)
  })

  it('approves the talk', async () => {
    await approveTalk.execute(juniorXpId())

    const savedTalk = await talkRepository.getJuniorXpTalk()
    expect(savedTalk.hasStatus(TalkStatus.APPROVED)).toBe(true)
  })

  it('fails if the talk is in PROPOSAL', async () => {
    const talkId = improvingTestsId()

    const result = approveTalk.execute(talkId)

    await expect(result).rejects.toThrowError(new TalkCannotBeApprovedError(talkId))
  })

  it('fails if the talk does not exist', async () => {
    const talkId = nonExistingTalkId()

    const result = approveTalk.execute(talkId)

    await expect(result).rejects.toThrowError(new TalkNotFoundError(talkId))
  })
})
