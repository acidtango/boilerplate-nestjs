import { VLCTECHFEST } from '../../../shared/infrastructure/fixtures/events'
import { EventName } from './EventName'

describe('EventName', () => {
  it('is serializable', () => {
    const namePrimitive = VLCTECHFEST.name

    const name = EventName.fromPrimitives(namePrimitive)

    expect(name).toBeInstanceOf(EventName)
    expect(name.toPrimitives()).toEqual(namePrimitive)
  })
})
