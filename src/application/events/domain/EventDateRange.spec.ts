import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventDateRange } from './EventDateRange'

describe('EventDateRange', () => {
  it('is serializable', () => {
    const { startDate, endDate } = CODEMOTION

    const eventDateRange = EventDateRange.fromPrimitives({ startDate, endDate })

    expect(eventDateRange).toBeInstanceOf(EventDateRange)
    expect(eventDateRange.toPrimitives()).toEqual({ startDate, endDate })
  })
})
