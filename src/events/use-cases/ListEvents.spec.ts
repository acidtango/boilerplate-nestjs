import { EventRepository } from '../domain/EventRepository'
import { EventRepositoryMemory } from '../infrastructure/repositories/EventRepositoryMemory'
import { ListEvents } from './ListEvents'

import { jsdayEvent } from '../../../test/mother/EventMother/JsDay'

describe('ListEvents', () => {
  it('returns all the events', async () => {
    const eventRepository: EventRepository = new EventRepositoryMemory()
    const events = [jsdayEvent()]
    jest.spyOn(eventRepository, 'findAll').mockReturnValue(Promise.resolve(events))
    const createEventUseCase = new ListEvents(eventRepository)

    const talkEvents = await createEventUseCase.execute()

    expect(talkEvents).toEqual(events)
  })
})
