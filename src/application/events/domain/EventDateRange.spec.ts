import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventName } from './EventName'
import { EventDateRange } from './EventDateRange'

describe('EventDateRange', () => {
  describe('fromPrimitives', () => {
    it('creates an EventName instance', () => {
      const startDateRangePrimitive = CODEMOTION.startDate
      const endDateRangePrimitive = CODEMOTION.endDate

      const eventDateRange = EventDateRange.fromPrimitives(
        startDateRangePrimitive,
        endDateRangePrimitive
      )

      expect(eventDateRange).toBeInstanceOf(EventDateRange)
    })

    it.skip('stores the right Value', () => {
      const namePrimitive = CODEMOTION.name

      const name = EventName.fromPrimitives(namePrimitive)

      expect(name.toPrimitives()).toEqual(namePrimitive)
    })

    it.skip('stores the right Value2', () => {
      const namePrimitive = 'CanariasJS'

      const name = EventName.fromPrimitives(namePrimitive)

      expect(name.toPrimitives()).toEqual(namePrimitive)
    })
  })
})
