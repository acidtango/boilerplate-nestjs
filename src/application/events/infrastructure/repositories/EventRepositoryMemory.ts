import { EventRepository } from '../../domain/EventRepository'
import { TalkEvent, TalkEventPrimitives } from '../../domain/TalkEvent'
import { EventId } from '../../../../shared/domain/ids/EventId'

export class EventRepositoryMemory implements EventRepository {
  private readonly talkEvents: Map<string, TalkEventPrimitives> = new Map()

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

  async reset() {
    this.talkEvents.clear()
  }
}
