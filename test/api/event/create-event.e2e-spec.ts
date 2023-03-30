import { createClient } from '../../utils/createClient'
import { CODEMOTION } from '../../../src/shared/fixtures/events'
import { HttpStatus } from '@nestjs/common'

describe('create event', () => {
  it('creates the user', async () => {
    const client = await createClient()

    const { status } = await client.createEvent().run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: events } = await client.getEvents().run()
    expect(events).toHaveLength(1)
    const firstEvent = events[0]
    expect(firstEvent.id).toEqual(CODEMOTION.id)
    expect(firstEvent.name).toEqual(CODEMOTION.name)
    expect(firstEvent.dateRange.start).toEqual(CODEMOTION.startDate)
    expect(firstEvent.dateRange.end).toEqual(CODEMOTION.endDate)
    expect(firstEvent.proposalsDateRange.start).toEqual(CODEMOTION.proposalsStartDate)
    expect(firstEvent.proposalsDateRange.deadline).toEqual(CODEMOTION.proposalsDeadlineDate)
  })
})
