import { EventRepository } from './EventRepository'
import { TalkEvent, TalkEventPrimitives } from './TalkEvent'

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
}
