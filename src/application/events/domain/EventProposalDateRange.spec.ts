import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventProposalDateRange } from './EventProposalDateRange'

describe('EventProposalDateRange', () => {
  it('is serializable', () => {
    const { proposalsStartDate, proposalsDeadlineDate } = CODEMOTION

    const eventDateRange = EventProposalDateRange.fromPrimitives({
      startDate: proposalsStartDate,
      deadline: proposalsDeadlineDate,
    })

    expect(eventDateRange).toBeInstanceOf(EventProposalDateRange)
    expect(eventDateRange.toPrimitives()).toEqual({
      startDate: proposalsStartDate,
      deadline: proposalsDeadlineDate,
    })
  })
})
