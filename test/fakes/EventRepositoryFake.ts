import { EventRepositoryMemory } from '../../src/events/infrastructure/repositories/EventRepositoryMemory'
import { TalkEvent } from '../../src/events/domain/models/TalkEvent'

export class EventRepositoryFake extends EventRepositoryMemory {
  private saveCalled = false

  static empty() {
    return new EventRepositoryFake()
  }

  static with(event: TalkEvent) {
    const eventRepository = new EventRepositoryFake()
    eventRepository.saveSync(event)
    return eventRepository
  }

  async save(talkEvent: TalkEvent): Promise<void> {
    this.saveCalled = true
    return super.save(talkEvent)
  }

  expectSaveToHaveBeenCalled() {
    expect(this.saveCalled).toBe(true)
  }
}
