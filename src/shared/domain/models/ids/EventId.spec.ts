import { EventId } from './EventId'
import { VLCTECHFEST } from '../../../infrastructure/fixtures/events'

describe('EventId', () => {
  it('is serializable', () => {
    const eventIdPrimitive = VLCTECHFEST.id

    const id = EventId.fromPrimitives(eventIdPrimitive)

    expect(id).toBeInstanceOf(EventId)
    expect(id.toPrimitives()).toEqual(eventIdPrimitive)
  })
})
