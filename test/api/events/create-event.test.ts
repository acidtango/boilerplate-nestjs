import { beforeEach, describe, it } from 'node:test'
import { expect } from 'expect'
import { createClient } from '../../utils/TestClient.ts'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events.ts'

beforeEach(async () => {
  const client = await createClient()
  await client.reset()
})

describe('create event', (dctx) => {
  it('can be created', async (tctx) => {
    console.log(dctx, tctx)
    const client = await createClient()

    const { status } = await client.createEvent()

    expect(status).toEqual(201)
    const { body: events } = await client.getEvents()
    expect(events).toHaveLength(1)
    const firstEvent = events[0]
    expect(firstEvent.id).toEqual(JSDAY_CANARIAS.id)
    expect(firstEvent.name).toEqual(JSDAY_CANARIAS.name)
    expect(firstEvent.dateRange.startDate).toEqual(JSDAY_CANARIAS.startDate.toISOString())
    expect(firstEvent.dateRange.endDate).toEqual(JSDAY_CANARIAS.endDate.toISOString())
  })
})
