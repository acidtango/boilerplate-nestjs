import { createApiTalk } from '../../../../test/mother/TalkMother'
import { Talk } from './Talk'
import { TalkStatus } from './TalkStatus'
import { TalkAlreadyBeingReviewed } from './errors/TalkAlreadyBeingReviewed'
import { FRAN } from '../../../shared/fixtures/organizers'

function getCurrentStatus(talk: Talk) {
  if (talk.isApproved) {
    return TalkStatus.APPROVED
  } else if (talk.isApproved === false) {
    return TalkStatus.REJECTED
  } else if (talk.reviewerId) {
    return TalkStatus.REVIEWING
  } else {
    return TalkStatus.PROPOSAL
  }
}

describe('Talk', () => {
  it('is not assigned for review when created', () => {
    const talk = createApiTalk()

    const notExistentId = 'not-existent-id'
    expect(talk.reviewerId === notExistentId).toBe(false)
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
      throw new TalkAlreadyBeingReviewed(talk.id)
    }

    talk.reviewerId = reviewerId

    expect(talk.reviewerId === reviewerId).toBe(true)
  })

  it('has status REVIEWING when assigned to a reviewer', () => {
    const talk = createApiTalk()
    const reviewerId = FRAN.id

    if (getCurrentStatus(talk) === TalkStatus.REVIEWING) {
      throw new TalkAlreadyBeingReviewed(talk.id)
    }

    talk.reviewerId = reviewerId

    expect(getCurrentStatus(talk) === TalkStatus.REVIEWING).toBe(true)
  })
})
