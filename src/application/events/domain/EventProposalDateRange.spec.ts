import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventProposalsDateRange } from './EventProposalsDateRange'

describe('EventProposalsDateRange', () => {
  it('is serializable', () => {
    const { proposalsStartDate, proposalsDeadlineDate } = CODEMOTION

    const proposalsDateRange = EventProposalsDateRange.fromPrimitives({
      startDate: proposalsStartDate,
      deadline: proposalsDeadlineDate,
    })

    expect(proposalsDateRange).toBeInstanceOf(EventProposalsDateRange)
    expect(proposalsDateRange.toPrimitives()).toEqual({
      startDate: proposalsStartDate,
      deadline: proposalsDeadlineDate,
    })
  })
})
