import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventProposalDateRange } from './EventProposalDateRange'

describe('EventProposalDateRange', () => {
  describe('fromPrimitives', () => {
    it('creates an EventName instance', () => {
      const { proposalsStartDate, proposalsDeadlineDate } = CODEMOTION

      const eventDateRange = EventProposalDateRange.fromPrimitives({
        startDate: proposalsStartDate,
        deadline: proposalsDeadlineDate,
      })

      expect(eventDateRange).toBeInstanceOf(EventProposalDateRange)
    })

    it('stores the right value', () => {
      const { proposalsStartDate, proposalsDeadlineDate } = CODEMOTION

      const eventDateRange = EventProposalDateRange.fromPrimitives({
        startDate: proposalsStartDate,
        deadline: proposalsDeadlineDate,
      })

      expect(eventDateRange.toPrimitives()).toEqual({
        startDate: proposalsStartDate,
        deadline: proposalsDeadlineDate,
      })
    })
  })
})
