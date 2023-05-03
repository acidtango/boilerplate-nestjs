import { createApiTalk } from '../../../../test/mother/TalkMother'
import { MaximumCospeakersReachedError } from './errors/MaximumCospeakersReachedError'
import { Talk } from './Talk'
import { TalkStatus } from './TalkStatus'
import { TalkAlreadyBeingReviewed } from './errors/TalkAlreadyBeingReviewed'
import { FRAN } from '../../../shared/fixtures/organizers'

function getCurrentStatus(talk: Talk) {
  if (talk.getIsApproved()) {
    return TalkStatus.APPROVED
  } else if (talk.getIsApproved() === false) {
    return TalkStatus.REJECTED
  } else if (talk.getReviewerId()) {
    return TalkStatus.REVIEWING
  } else {
    return TalkStatus.PROPOSAL
  }
}

describe('Talk', () => {
  it('fails if cospeakers are greater than 4', () => {
    const cospeakers = [
      '51cb0a36-0d61-49e3-89a1-276af899b028',
      '30ddf8ac-fdf1-4828-9df6-a42dd4e132db',
      '10705038-d0ec-4181-be58-6aa2e282ec3e',
      'c0650351-b6aa-4ae1-9ac6-30af6f8d3778',
    ]

    expect(() => createApiTalk({ cospeakers })).toThrowError(new MaximumCospeakersReachedError())
  })

  it('is not assigned for review when created', () => {
    const talk = createApiTalk()

    const notExistentId = 'not-existent-id'
    expect(talk.getReviewerId() === notExistentId).toBe(false)
  })

  it('has status PROPOSAL when created', () => {
    const talk = createApiTalk()

    expect(getCurrentStatus(talk) === TalkStatus.PROPOSAL).toBe(true)
  })

  it('does not have status REVIEWING when created', () => {
    const talk = createApiTalk()

    expect(getCurrentStatus(talk) === TalkStatus.REVIEWING).toBe(false)
  })

  it('can be assigned to a reviewer', () => {
    const talk = createApiTalk()
    const reviewerId = FRAN.id

    if (getCurrentStatus(talk) === TalkStatus.REVIEWING) {
      throw new TalkAlreadyBeingReviewed(talk.getTalkId())
    }

    talk.setReviewerId(reviewerId)

    expect(talk.getReviewerId() === reviewerId).toBe(true)
  })

  it('has status REVIEWING when assigned to a reviewer', () => {
    const talk = createApiTalk()
    const reviewerId = FRAN.id

    if (getCurrentStatus(talk) === TalkStatus.REVIEWING) {
      throw new TalkAlreadyBeingReviewed(talk.getTalkId())
    }

    talk.setReviewerId(reviewerId)

    expect(getCurrentStatus(talk) === TalkStatus.REVIEWING).toBe(true)
  })
})
