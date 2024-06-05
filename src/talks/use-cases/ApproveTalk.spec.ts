import { TalkRepositoryFake } from '../../../test/fakes/TalkRepositoryFake'
import { discoveringTechTalentId, discoveringTechTalentTalkReviewed } from '../../../test/mother/TalkMother/DiscoveringTechTalent'
import { TalkStatus } from '../domain/models/TalkStatus'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'
import { ApproveTalk } from './ApproveTalk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import {
  webAccessibilityId,
  webAccessibilityTalk,
} from '../../../test/mother/TalkMother/WebAccessibility'
import { nonExistingTalkId } from '../../../test/mother/TalkMother/NotExistent'

describe('ApproveTalk', () => {
  let talkRepository: TalkRepositoryFake
  let approveTalk: ApproveTalk

  beforeEach(() => {
    talkRepository = TalkRepositoryFake.createWith(discoveringTechTalentTalkReviewed(), webAccessibilityTalk())
    approveTalk = new ApproveTalk(talkRepository)
  })

  it('approves the talk', async () => {
    await approveTalk.execute(discoveringTechTalentId())

    const savedTalk = await talkRepository.getJuniorXpTalk()
    expect(savedTalk.hasStatus(TalkStatus.APPROVED)).toBe(true)
  })

  it('fails if the talk is in PROPOSAL', async () => {
    const talkId = webAccessibilityId()

    const result = approveTalk.execute(talkId)

    await expect(result).rejects.toThrow(new TalkCannotBeApprovedError(talkId))
  })

  it('fails if the talk does not exist', async () => {
    const talkId = nonExistingTalkId()

    const result = approveTalk.execute(talkId)

    await expect(result).rejects.toThrow(new TalkNotFoundError(talkId))
  })
})
