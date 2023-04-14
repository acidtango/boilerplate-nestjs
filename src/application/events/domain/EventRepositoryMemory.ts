import { EventRepository } from './EventRepository'
import { TalkEvent, TalkEventPrimitives } from './TalkEvent'
import { EventId } from './EventId'

export class EventRepositoryMemory implements EventRepository {
  private talkEvents: Map<string, TalkEventPrimitives> = new Map()

  async save(talkEvent: TalkEvent): Promise<void> {
    const talkEventPrimitives = talkEvent.toPrimitives()

    this.talkEvents.set(talkEventPrimitives.id, talkEventPrimitives)
  }

  async findAll(): Promise<TalkEvent[]> {
    const talkEventsPrimitives = [...this.talkEvents.values()]

    return talkEventsPrimitives.map(TalkEvent.fromPrimitives)
  }

  async exists(id: EventId): Promise<boolean> {
    return this.talkEvents.has(id.toPrimitives())
  }
}
