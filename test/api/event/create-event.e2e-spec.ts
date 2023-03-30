import { HttpStatus } from '@nestjs/common'
import { createClient } from '../../utils/createClient'

describe('create event', () => {
  it('creates the user', async () => {
    const client = await createClient()

    await client.createEvent().expect(HttpStatus.CREATED).run()

    const { body: events } = await client.getEvents().run()
    expect(events).toHaveLength(1)
    expect(events[0].id).toEqual(CODEMOTION.id)
    expect(events[0].name).toEqual(CODEMOTION.name)
    expect(events[0].dates.start).toEqual(CODEMOTION.startDate)
    expect(events[0].dates.end).toEqual(CODEMOTION.endDate)
    expect(events[0].proposalsDates.start).toEqual(CODEMOTION.proposalsStartDate)
    expect(events[0].proposalsDates.deadline).toEqual(CODEMOTION.proposalsDeadlineDate)
  })
})
