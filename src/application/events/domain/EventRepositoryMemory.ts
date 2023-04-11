import { EventRepository } from './EventRepository'

export class EventRepositoryMemory implements EventRepository {
  async save(event: Event): Promise<void> {}
}
