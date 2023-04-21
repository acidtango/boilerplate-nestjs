import { TalkEvent } from './TalkEvent'
import { EventId } from '../../../shared/domain/ids/EventId'

export interface EventRepository {
  save(event: TalkEvent): Promise<void>
  findAll(): Promise<TalkEvent[]>
  exists(id: EventId): Promise<boolean>
}
