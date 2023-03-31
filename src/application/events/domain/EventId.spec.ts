import { EventId } from './EventId'
import { CODEMOTION } from '../../../shared/fixtures/events'

describe('EventId', () => {
  it('is serializable', () => {
    const eventIdPrimitive = CODEMOTION.id

    const id = EventId.fromPrimitives(eventIdPrimitive)

    expect(id).toBeInstanceOf(EventId)
    expect(id.toPrimitives()).toEqual(eventIdPrimitive)
  })
})
