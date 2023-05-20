import { createClient } from '../../utils/createClient'
import { CODEMOTION } from '../../../src/application/shared/infrastructure/fixtures/events'
import { HttpStatus } from '@nestjs/common'

describe('create event', () => {
  it('can be created', async () => {
    const client = await createClient()

    const { status } = await client.createEvent().run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: events } = await client.getEvents().run()
    expect(events).toHaveLength(1)
    const firstEvent = events[0]
    expect(firstEvent.id).toEqual(CODEMOTION.id)
    expect(firstEvent.name).toEqual(CODEMOTION.name)
    expect(firstEvent.dateRange.startDate).toEqual(CODEMOTION.startDate.toISOString())
    expect(firstEvent.dateRange.endDate).toEqual(CODEMOTION.endDate.toISOString())
  })
})
