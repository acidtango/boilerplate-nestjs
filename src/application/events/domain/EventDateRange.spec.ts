import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventDateRange } from './EventDateRange'

describe('EventDateRange', () => {
  describe('fromPrimitives', () => {
    it('creates an EventName instance', () => {
      const { startDate, endDate } = CODEMOTION

      const eventDateRange = EventDateRange.fromPrimitives({ startDate, endDate })

      expect(eventDateRange).toBeInstanceOf(EventDateRange)
    })

    it('stores the right value', () => {
      const { startDate, endDate } = CODEMOTION

      const eventDateRange = EventDateRange.fromPrimitives({ startDate, endDate })

      expect(eventDateRange.toPrimitives()).toEqual({ startDate, endDate })
    })
  })
})
