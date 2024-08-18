import { describe, it } from 'node:test'
import { expect } from 'expect'
import { JSDAY_CANARIAS } from '../../../shared/infrastructure/fixtures/events.ts'
import { EventName } from './EventName.ts'

describe('EventName', () => {
  it('is serializable', () => {
    const namePrimitive = JSDAY_CANARIAS.name

    const name = EventName.fromPrimitives(namePrimitive)

    expect(name).toBeInstanceOf(EventName)
    expect(name.toPrimitives()).toEqual(namePrimitive)
  })
})
