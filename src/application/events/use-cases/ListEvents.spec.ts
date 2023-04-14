import { EventRepository } from '../domain/EventRepository'
import { EventRepositoryMemory } from '../domain/EventRepositoryMemory'
import { ListEvents } from './ListEvents'
import { createCodemotionEvent } from '../../../../test/mother/TalkEventMother'

describe('ListEvents', () => {
  it('returns all the events', async () => {
    const eventRepository: EventRepository = new EventRepositoryMemory()
    const events = [createCodemotionEvent()]
    jest.spyOn(eventRepository, 'findAll').mockReturnValue(Promise.resolve(events))
    const createEventUseCase = new ListEvents(eventRepository)

    const talkEvents = await createEventUseCase.execute()

    expect(talkEvents).toEqual(events)
  })
})
