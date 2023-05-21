import { EventRepository } from '../../domain/repositories/EventRepository'
import { TalkEvent, TalkEventPrimitives } from '../../domain/models/TalkEvent'
import { EventId } from '../../../shared/domain/models/ids/EventId'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'

export class EventRepositoryMemory implements EventRepository, Reseteable {
  private readonly talkEvents: Map<string, TalkEventPrimitives> = new Map()

  async save(talkEvent: TalkEvent): Promise<void> {
    this.saveSync(talkEvent)
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

  protected saveSync(talkEvent: TalkEvent) {
    const talkEventPrimitives = talkEvent.toPrimitives()

    this.talkEvents.set(talkEventPrimitives.id, talkEventPrimitives)
  }
}
