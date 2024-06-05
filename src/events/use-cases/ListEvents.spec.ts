import { EventRepository } from '../domain/repositories/EventRepository'
import { ListEvents } from './ListEvents'

import { vlcTechFestEvent } from '../../../test/mother/EventMother/VlcTechFest'
import { EventRepositoryFake } from '../../../test/fakes/EventRepositoryFake'

describe('ListEvents', () => {
  it('returns all the events', async () => {
    const event = vlcTechFestEvent()
    const eventRepository: EventRepository = EventRepositoryFake.with(event)
    const listEvents = new ListEvents(eventRepository)

    const talkEvents = await listEvents.execute()

    expect(talkEvents).toEqual([event])
  })
})
