import { TalkEvent } from '../models/TalkEvent'
import { EventId } from '../../../shared/domain/models/ids/EventId'

export interface EventRepository {
  save(event: TalkEvent): Promise<void>
  findAll(): Promise<TalkEvent[]>
  exists(id: EventId): Promise<boolean>
}
