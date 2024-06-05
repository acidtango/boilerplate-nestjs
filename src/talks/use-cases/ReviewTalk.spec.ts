import { discoveringTechTalentId } from '../../../test/mother/TalkMother/DiscoveringTechTalent'
import { TalkRepositoryFake } from '../../../test/fakes/TalkRepositoryFake'
import { ReviewTalk } from './ReviewTalk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { TalkAssignedForReview } from '../domain/events/TalkAssignedForReview'
import { TalkAlreadyBeingReviewed } from '../domain/errors/TalkAlreadyBeingReviewed'
import { EventBusFake } from '../../../test/fakes/EventBusFake'
import { webAccessibilityId } from '../../../test/mother/TalkMother/WebAccessibility'
import { cesarId } from '../../../test/mother/OrganizerMother/Cesar'
import { notImportantOrganizerId } from '../../../test/mother/OrganizerMother/NotImportant'

describe('ReviewTalk', () => {
  let eventBus: EventBusFake
  let talkRepository: TalkRepositoryFake
  let reviewTalk: ReviewTalk

  beforeEach(() => {
    eventBus = new EventBusFake()
    talkRepository = TalkRepositoryFake.createWithJuniorXp()
    reviewTalk = new ReviewTalk(eventBus, talkRepository)
  })

  it('assigns the talk to a reviewer', async () => {
    const talkId = discoveringTechTalentId()
    const reviewerId = cesarId()

    await reviewTalk.execute({ talkId, reviewerId })

    const savedTalk = talkRepository.getLatestSavedTalk()
    expect(savedTalk.isGoingToBeReviewedBy(reviewerId)).toBe(true)
  })

  it('event should be emitted', async () => {
    const talkId = discoveringTechTalentId()
    const reviewerId = cesarId()

    await reviewTalk.execute({ talkId, reviewerId })

    eventBus.expectLastEventToBe(new TalkAssignedForReview(talkId, reviewerId))
  })

  it('fails if talk does not exist', async () => {
    const talkId = webAccessibilityId()

    const result = reviewTalk.execute({ talkId, reviewerId: notImportantOrganizerId() })

    await expect(result).rejects.toThrow(new TalkNotFoundError(talkId))
  })

  it('fails if talk is already being reviewed', async () => {
    const talkId = discoveringTechTalentId()
    const reviewerId = cesarId()
    await reviewTalk.execute({ talkId, reviewerId })

    const result = reviewTalk.execute({ talkId, reviewerId })

    await expect(result).rejects.toThrow(new TalkAlreadyBeingReviewed(talkId))
  })
})
