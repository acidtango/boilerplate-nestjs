import { EventRepository } from '../domain/repositories/EventRepository'
import { ListEvents } from './ListEvents'

import { jsdayEvent } from '../../../test/mother/EventMother/JsDay'
import { EventRepositoryFake } from '../../../test/fakes/EventRepositoryFake'

describe('ListEvents', () => {
  it('returns all the events', async () => {
    const event = jsdayEvent()
    const eventRepository: EventRepository = EventRepositoryFake.with(event)
    const listEvents = new ListEvents(eventRepository)

    const talkEvents = await listEvents.execute()

    expect(talkEvents).toEqual([event])
  })
})
