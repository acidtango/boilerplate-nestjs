import { JSDAY_CANARIAS } from '../../../shared/infrastructure/fixtures/events'
import { EventProposalsDateRange } from './EventProposalsDateRange'
import { InvalidDateRangeError } from '../errors/InvalidDateRangeError'

describe('EventProposalsDateRange', () => {
  it('is serializable', () => {
    const { proposalsStartDate, proposalsDeadlineDate } = JSDAY_CANARIAS

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
        JSDAY_CANARIAS.proposalsDeadlineDate,
        JSDAY_CANARIAS.proposalsStartDate
      )
    }).toThrowError(
      new InvalidDateRangeError(
        JSDAY_CANARIAS.proposalsDeadlineDate,
        JSDAY_CANARIAS.proposalsStartDate
      )
    )
  })
})
