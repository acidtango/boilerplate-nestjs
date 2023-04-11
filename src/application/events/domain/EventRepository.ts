import { TalkEvent } from './TalkEvent'

export interface EventRepository {
  save(event: TalkEvent): Promise<void>
}
