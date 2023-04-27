import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { createApiTalk, createApiTalkId } from '../../../../test/mother/TalkMother'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { FRAN } from '../../../shared/fixtures/organizers'
import { TalkStatus } from '../domain/TalkStatus'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'
import { ApproveTalk } from './ApproveTalk'

describe('ApproveTalk', () => {
  it('fails if the talk is in PROPOSAL', async () => {
    const talkRepository = TalkRepositoryFake.createWithApiTalk()
    const approveTalk = new ApproveTalk(talkRepository)

    await expect(() => approveTalk.execute(createApiTalkId())).rejects.toThrowError(
      new TalkCannotBeApprovedError()
    )
  })

  it('approves the talk if it is currently in REVIEWING', async () => {
    const talkRepository = TalkRepositoryFake.createWithApiTalk()
    const talk = createApiTalk()
    talk.assignReviewer(new OrganizerId(FRAN.id))
    talkRepository.save(talk)
    const approveTalk = new ApproveTalk(talkRepository)

    await approveTalk.execute(createApiTalkId())

    const savedTalk = talkRepository.getLatestSavedTalk()
    expect(savedTalk.hasStatus(TalkStatus.APPROVED)).toBe(true)
  })
})
