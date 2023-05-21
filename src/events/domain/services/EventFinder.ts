import { DomainService } from '../../../shared/domain/models/hex/DomainService'
import { EventRepository } from '../repositories/EventRepository'
import { TalkEventNotFoundError } from '../errors/TalkEventNotFoundError'
import { EventId } from '../../../shared/domain/models/ids/EventId'

export class EventFinder extends DomainService {
  constructor(private readonly eventRepository: EventRepository) {
    super()
  }

  async ensureExists(id: EventId) {
    if (!(await this.eventRepository.exists(id))) {
      throw new TalkEventNotFoundError(id)
    }
  }
}
