import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventName } from './EventName'

describe('EventName', () => {
  describe('fromPrimitives', () => {
    it('creates an EventName instance', () => {
      const namePrimitive = CODEMOTION.name

      const name = EventName.fromPrimitives(namePrimitive)

      expect(name).toBeInstanceOf(EventName)
    })

    it('stores the right Value', () => {
      const namePrimitive = CODEMOTION.name

      const name = EventName.fromPrimitives(namePrimitive)

      expect(name.toPrimitives()).toEqual(namePrimitive)
    })

    it('stores the right Value2', () => {
      const namePrimitive = 'CanariasJS'

      const name = EventName.fromPrimitives(namePrimitive)

      expect(name.toPrimitives()).toEqual(namePrimitive)
    })
  })
})
