import { ReviewTalkEndpoint } from './ReviewTalkEndpoint'
import { FRAN } from '../../../../shared/fixtures/organizers'
import { EventBus } from '../../../../shared/domain/hex/EventBus'
import { EventBusNoop } from '../../../../shared/infrastructure/events/EventBusNoop'
import { createApiTalk, createApiTalkId } from '../../../../../test/mother/TalkMother'
import { TalkAssignedForReview } from '../../domain/TalkAssignedForReview'
import { TalkNotFoundError } from '../../domain/errors/TalkNotFoundError'
import { TalkAlreadyBeingReviewed } from '../../domain/errors/TalkAlreadyBeingReviewed'
import { ReviewTalkRequestDTO } from './dtos/ReviewTalkRequestDTO'
import { API_TALK } from '../../../../shared/fixtures/talks'
import { createMongoClientMemory } from '../../../shared/infrastructure/createMongoClientMemory'

describe('ReviewTalkEndpoint', () => {
  let eventBus: EventBus

  beforeEach(() => {
    eventBus = new EventBusNoop()
  })

  it('assigns the talk to a reviewer', async () => {
    const mongoClient = createMongoClientMemory(createApiTalk())
    const reviewTalk = new ReviewTalkEndpoint(eventBus, mongoClient)
    const reviewerId = FRAN.id

    await reviewTalk.execute(API_TALK.id, ReviewTalkRequestDTO.create({ reviewerId }))

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedTalk = mongoClient.getSaved()
    expect(savedTalk.reviewerId === reviewerId).toBe(true)
  })

  it('event should be emitted', async () => {
    const talkId = createApiTalkId()
    const mongoClient = createMongoClientMemory(createApiTalk())
    jest.spyOn(eventBus, 'publish')
    const reviewTalk = new ReviewTalkEndpoint(eventBus, mongoClient)
    const reviewerId = FRAN.id

    await reviewTalk.execute(
      API_TALK.id,
      ReviewTalkRequestDTO.create({
        reviewerId,
      })
    )

    expect(eventBus.publish).toHaveBeenCalledWith([new TalkAssignedForReview(talkId, reviewerId)])
  })

  it('fails if talk does not exist', async () => {
    const notExistentId = API_TALK.id
    const mongoClient = createMongoClientMemory()
    const reviewTalk = new ReviewTalkEndpoint(eventBus, mongoClient)
    const notImportantId = FRAN.id

    const expectedError = new TalkNotFoundError(notExistentId)
    await expect(() =>
      reviewTalk.execute(notExistentId, ReviewTalkRequestDTO.create({ reviewerId: notImportantId }))
    ).rejects.toThrowError(expectedError)
  })

  it('fails if talk is already being reviewed', async () => {
    const talkId = API_TALK.id
    const mongoClient = createMongoClientMemory(createApiTalk())
    const reviewTalk = new ReviewTalkEndpoint(eventBus, mongoClient)
    const reviewerId = FRAN.id
    await reviewTalk.execute(
      talkId,
      ReviewTalkRequestDTO.create({
        reviewerId,
      })
    )

    const expectedError = new TalkAlreadyBeingReviewed(talkId)
    await expect(
      reviewTalk.execute(
        talkId,
        ReviewTalkRequestDTO.create({
          reviewerId,
        })
      )
    ).rejects.toThrowError(expectedError)
  })
})
