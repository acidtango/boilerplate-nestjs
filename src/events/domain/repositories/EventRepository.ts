import { TalkEvent } from '../models/TalkEvent.ts'
import { EventId } from '../../../shared/domain/models/ids/EventId.ts'

export interface EventRepository {
  save(event: TalkEvent): Promise<void>
  findAll(): Promise<TalkEvent[]>
  exists(id: EventId): Promise<boolean>
}
