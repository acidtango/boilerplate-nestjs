import { TalkEvent } from './TalkEvent'
import { EventId } from './EventId'

export interface EventRepository {
  save(event: TalkEvent): Promise<void>
  findAll(): Promise<TalkEvent[]>
  exists(id: EventId): Promise<boolean>
}
