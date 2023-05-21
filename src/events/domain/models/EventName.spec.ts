import { JSDAY_CANARIAS } from '../../../shared/infrastructure/fixtures/events'
import { EventName } from './EventName'

describe('EventName', () => {
  it('is serializable', () => {
    const namePrimitive = JSDAY_CANARIAS.name

    const name = EventName.fromPrimitives(namePrimitive)

    expect(name).toBeInstanceOf(EventName)
    expect(name.toPrimitives()).toEqual(namePrimitive)
  })
})
