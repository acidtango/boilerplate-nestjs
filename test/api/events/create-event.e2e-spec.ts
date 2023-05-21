import { createClient } from '../../utils/createClient'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events'
import { HttpStatus } from '@nestjs/common'

describe('create event', () => {
  it('can be created', async () => {
    const client = await createClient()

    const { status } = await client.createEvent().run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: events } = await client.getEvents().run()
    expect(events).toHaveLength(1)
    const firstEvent = events[0]
    expect(firstEvent.id).toEqual(JSDAY_CANARIAS.id)
    expect(firstEvent.name).toEqual(JSDAY_CANARIAS.name)
    expect(firstEvent.dateRange.startDate).toEqual(JSDAY_CANARIAS.startDate.toISOString())
    expect(firstEvent.dateRange.endDate).toEqual(JSDAY_CANARIAS.endDate.toISOString())
  })
})
