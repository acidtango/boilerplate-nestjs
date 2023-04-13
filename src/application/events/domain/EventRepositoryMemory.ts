import { EventRepository } from './EventRepository'
import { TalkEvent } from './TalkEvent'

export class EventRepositoryMemory implements EventRepository {
  async save(talkEvent: TalkEvent): Promise<void> {}

  async findAll(): Promise<TalkEvent[]> {
    return []
  }
}
