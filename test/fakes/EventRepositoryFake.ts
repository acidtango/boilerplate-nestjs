import { EventRepositoryMemory } from '../../src/events/infrastructure/repositories/EventRepositoryMemory'
import { TalkEvent } from '../../src/events/domain/TalkEvent'

export class EventRepositoryFake extends EventRepositoryMemory {
  static with(event: TalkEvent) {
    const eventRepository = new EventRepositoryFake()
    eventRepository.saveSync(event)
    return eventRepository
  }
}
