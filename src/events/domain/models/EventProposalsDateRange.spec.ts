import { VLCTECHFEST } from '../../../shared/infrastructure/fixtures/events'
import { EventProposalsDateRange } from './EventProposalsDateRange'
import { InvalidDateRangeError } from '../errors/InvalidDateRangeError'

describe('EventProposalsDateRange', () => {
  it('is serializable', () => {
    const { proposalsStartDate, proposalsDeadlineDate } = VLCTECHFEST

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
      new EventProposalsDateRange(
        VLCTECHFEST.proposalsDeadlineDate,
        VLCTECHFEST.proposalsStartDate
      )
    }).toThrow(
      new InvalidDateRangeError(
        VLCTECHFEST.proposalsDeadlineDate,
        VLCTECHFEST.proposalsStartDate
      )
    )
  })
})
