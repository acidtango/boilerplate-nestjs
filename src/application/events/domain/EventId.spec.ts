import { EventId } from './EventId'
import { CODEMOTION } from '../../../shared/fixtures/events'

describe('EventId', () => {
  describe('fromPrimitives', () => {
    it('creates an EventId instance', () => {
      const eventIdPrimitive = CODEMOTION.id

      const id = EventId.fromPrimitives(eventIdPrimitive)

      expect(id).toBeInstanceOf(EventId)
    })
    it('stores the right Value', () => {
      const eventIdPrimitive = CODEMOTION.id

      const id = EventId.fromPrimitives(eventIdPrimitive)

      expect(id.toPrimitives()).toEqual(eventIdPrimitive)
    })
  })
})
