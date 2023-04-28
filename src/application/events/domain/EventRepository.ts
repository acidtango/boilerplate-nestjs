import { TalkEvent } from './TalkEvent'

export interface EventRepository {
  save(event: TalkEvent): Promise<void>
  findAll(): Promise<TalkEvent[]>
  exists(id: string): Promise<boolean>
}
