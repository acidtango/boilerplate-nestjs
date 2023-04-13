import { UseCase } from '../../../shared/domain/hex/UseCase'
import { EventDateRange } from '../domain/EventDateRange'
import { EventId } from '../domain/EventId'
import { EventName } from '../domain/EventName'
import { EventProposalsDateRange } from '../domain/EventProposalsDateRange'
import { TalkEvent } from '../domain/TalkEvent'
import { EventRepository } from '../domain/EventRepository'
import { Inject } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'

type CreateEventParams = {
  id: EventId
  name: EventName
  dateRange: EventDateRange
  proposalsDateRange: EventProposalsDateRange
}

export class CreateEvent extends UseCase {
  constructor(@Inject(AppProvider.EVENT_REPOSITORY) private eventRepository: EventRepository) {
    super()
  }

  async execute(params: CreateEventParams) {
    const talkEvent = TalkEvent.create(
      params.id,
      params.name,
      params.dateRange,
      params.proposalsDateRange
    )

    await this.eventRepository.save(talkEvent)
  }
}
