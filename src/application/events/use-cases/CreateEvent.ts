import { UseCase } from '../../../shared/domain/hex/UseCase'
import { EventDateRange } from '../domain/EventDateRange'
import { EventId } from '../domain/EventId'
import { EventName } from '../domain/EventName'
import { EventProposalsDateRange } from '../domain/EventProposalsDateRange'
import { Event } from '../domain/Event'
import { EventRepository } from '../domain/EventRepository'

type CreateEventParams = {
  id: EventId
  name: EventName
  dateRange: EventDateRange
  proposalsDateRange: EventProposalsDateRange
}

export class CreateEvent extends UseCase {
  constructor(private eventRepository: EventRepository) {
    super()
  }

  async execute(params: CreateEventParams) {
    await this.eventRepository.save(new Event())
  }
}
