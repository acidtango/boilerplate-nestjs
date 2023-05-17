import { createApiTalk } from '../../../../test/mother/TalkMother'
import { MaximumCospeakersReachedError } from './errors/MaximumCospeakersReachedError'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { FRAN } from '../../../shared/fixtures/organizers'
import { TalkStatus } from './TalkStatus'

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

    const notExistentId = new OrganizerId('not-existent-id')
    expect(talk.isGoingToBeReviewedBy(notExistentId)).toBe(false)
  })

  it('has status PROPOSAL when created', () => {
    const talk = createApiTalk()

    expect(talk.hasStatus(TalkStatus.PROPOSAL)).toBe(true)
  })

  it('does not have status REVIEWING when created', () => {
    const talk = createApiTalk()

    expect(talk.hasStatus(TalkStatus.REVIEWING)).toBe(false)
  })

  it('can be assigned to a reviewer', () => {
    const talk = createApiTalk()
    const reviewerId = new OrganizerId(FRAN.id)

    talk.assignForReviewTo(reviewerId)

    expect(talk.isGoingToBeReviewedBy(reviewerId)).toBe(true)
  })

  it('has status REVIEWING when assigned to a reviewer', () => {
    const talk = createApiTalk()
    const reviewerId = new OrganizerId(FRAN.id)

    talk.assignForReviewTo(reviewerId)

    expect(talk.hasStatus(TalkStatus.REVIEWING)).toBe(true)
  })
})
