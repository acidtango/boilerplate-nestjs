import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventProposalsDateRange } from './EventProposalsDateRange'
import { InvalidDateRangeError } from './errors/InvalidDateRangeError'

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

  it('fails if event start date is greater than end date', () => {
    expect(() => {
      new EventProposalsDateRange(CODEMOTION.proposalsDeadlineDate, CODEMOTION.proposalsStartDate)
    }).toThrowError(
      new InvalidDateRangeError(CODEMOTION.proposalsDeadlineDate, CODEMOTION.proposalsStartDate)
    )
  })
})
