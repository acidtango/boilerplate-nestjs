import { juniorXpId, juniorXpTalk } from '../../../test/mother/TalkMother/JuniorXp'
import { TalkRepositoryFake } from '../../../test/fakes/TalkRepositoryFake'
import { ReviewTalk } from './ReviewTalk'
import { DAILOS } from '../../shared/infrastructure/fixtures/organizers'
import { OrganizerId } from '../../shared/domain/models/ids/OrganizerId'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { TalkAssignedForReview } from '../domain/TalkAssignedForReview'
import { TalkAlreadyBeingReviewed } from '../domain/errors/TalkAlreadyBeingReviewed'
import { EventBusFake } from '../../../test/fakes/EventBusFake'

describe('ReviewTalk', () => {
  let eventBus: EventBusFake

  beforeEach(() => {
    eventBus = new EventBusFake()
  })

  it('assigns the talk to a reviewer', async () => {
    const talkId = juniorXpId()
    const talk = juniorXpTalk()
    const talkRepository = TalkRepositoryFake.createWith(talk)
    const reviewTalk = new ReviewTalk(eventBus, talkRepository)
    const reviewerId = new OrganizerId(DAILOS.id)

    await reviewTalk.execute({
      talkId,
      reviewerId,
    })

    const savedTalk = talkRepository.getLatestSavedTalk()
    expect(savedTalk.isGoingToBeReviewedBy(reviewerId)).toBe(true)
  })

  it('event should be emitted', async () => {
    const talkId = juniorXpId()
    const talk = juniorXpTalk()
    const talkRepository = TalkRepositoryFake.createWith(talk)
    const reviewTalk = new ReviewTalk(eventBus, talkRepository)
    const reviewerId = new OrganizerId(DAILOS.id)

    await reviewTalk.execute({
      talkId,
      reviewerId,
    })

    eventBus.expectLastEventToBe(new TalkAssignedForReview(talkId, reviewerId))
  })

  it('fails if talk does not exist', async () => {
    const notExistentId = juniorXpId()
    const talkRepository = TalkRepositoryFake.empty()
    const reviewTalk = new ReviewTalk(eventBus, talkRepository)
    const notImportantId = new OrganizerId(DAILOS.id)

    const result = reviewTalk.execute({
      talkId: notExistentId,
      reviewerId: notImportantId,
    })

    await expect(result).rejects.toThrowError(new TalkNotFoundError(notExistentId))
  })

  it('fails if talk is already being reviewed', async () => {
    const talkId = juniorXpId()
    const talk = juniorXpTalk({ id: talkId })
    const talkRepository = TalkRepositoryFake.createWith(talk)
    const reviewTalk = new ReviewTalk(eventBus, talkRepository)
    const reviewerId = new OrganizerId(DAILOS.id)
    await reviewTalk.execute({
      talkId,
      reviewerId,
    })

    const result = reviewTalk.execute({
      talkId,
      reviewerId,
    })

    await expect(result).rejects.toThrowError(new TalkAlreadyBeingReviewed(talkId))
  })
})
