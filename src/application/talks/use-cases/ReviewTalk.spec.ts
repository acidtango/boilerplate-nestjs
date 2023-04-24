import { createApiTalk, createApiTalkId } from '../../../../test/mother/TalkMother'
import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { ReviewTalk } from './ReviewTalk'
import { FRAN } from '../../../shared/fixtures/organizers'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { EventBus } from '../../../shared/domain/hex/EventBus'
import { EventBusNoop } from '../../../shared/infrastructure/events/EventBusNoop'
import { TalkAssignedForReview } from '../domain/TalkAssignedForReview'

describe('ReviewTalk', () => {
  let eventBus: EventBus

  beforeEach(() => {
    eventBus = new EventBusNoop()
  })

  it('assigns the talk to a reviewer', async () => {
    const talkId = createApiTalkId()
    const talk = createApiTalk({ id: talkId })
    const talkRepository = TalkRepositoryFake.createWith(talk)
    const reviewTalk = new ReviewTalk(eventBus, talkRepository)
    const reviewerId = new OrganizerId(FRAN.id)

    await reviewTalk.execute({
      talkId,
      reviewerId,
    })

    const savedTalk = talkRepository.getLatestSavedTalk()
    expect(savedTalk.isGoingToBeReviewedBy(reviewerId)).toBe(true)
  })

  it('event should be emitted', async () => {
    const talkId = createApiTalkId()
    const talk = createApiTalk({ id: talkId })
    const talkRepository = TalkRepositoryFake.createWith(talk)
    jest.spyOn(eventBus, 'publish')
    const reviewTalk = new ReviewTalk(eventBus, talkRepository)
    const reviewerId = new OrganizerId(FRAN.id)

    await reviewTalk.execute({
      talkId,
      reviewerId,
    })

    expect(eventBus.publish).toHaveBeenCalledWith([new TalkAssignedForReview(talkId, reviewerId)])
  })

  it('fails if talk does not exist', async () => {
    const notExistentId = createApiTalkId()
    const talkRepository = TalkRepositoryFake.empty()
    const reviewTalk = new ReviewTalk(eventBus, talkRepository)
    const notImportantId = new OrganizerId(FRAN.id)

    const expectedError = new TalkNotFoundError(notExistentId)
    await expect(() =>
      reviewTalk.execute({
        talkId: notExistentId,
        reviewerId: notImportantId,
      })
    ).rejects.toThrowError(expectedError)
  })
})
