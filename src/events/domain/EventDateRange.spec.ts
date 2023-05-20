import { CODEMOTION } from '../../shared/infrastructure/fixtures/events'
import { EventDateRange } from './EventDateRange'
import { InvalidDateRangeError } from './errors/InvalidDateRangeError'

describe('EventDateRange', () => {
  it('is serializable', () => {
    const { startDate, endDate } = CODEMOTION

    const eventDateRange = EventDateRange.fromPrimitives({ startDate, endDate })

    expect(eventDateRange).toBeInstanceOf(EventDateRange)
    expect(eventDateRange.toPrimitives()).toEqual({ startDate, endDate })
  })

  it('fails if event start date is greater than end date', () => {
    expect(() => {
      new EventDateRange(CODEMOTION.endDate, CODEMOTION.startDate)
    }).toThrowError(new InvalidDateRangeError(CODEMOTION.endDate, CODEMOTION.startDate))
  })
})
