import { UseCase } from '../../../shared/domain/hex/UseCase'
import { EventDateRange } from '../domain/EventDateRange'
import { EventId } from '../domain/EventId'
import { EventName } from '../domain/EventName'
import { EventProposalsDateRange } from '../domain/EventProposalsDateRange'
import { TalkEvent } from '../domain/TalkEvent'
import { EventRepository } from '../domain/EventRepository'
import { Inject } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { EventAlreadyCreatedError } from '../domain/errors/EventAlreadyCreatedError'

export type CreateEventParams = {
  id: EventId
  name: EventName
  dateRange: EventDateRange
  proposalsDateRange: EventProposalsDateRange
}

export class CreateEvent extends UseCase {
  constructor(@Inject(AppProvider.EVENT_REPOSITORY) private eventRepository: EventRepository) {
    super()
  }

  async execute({ dateRange, id, name, proposalsDateRange }: CreateEventParams) {
    if (await this.eventRepository.exists(id)) {
      throw new EventAlreadyCreatedError(id)
    }

    const talkEvent = TalkEvent.create(id, name, dateRange, proposalsDateRange)

    await this.eventRepository.save(talkEvent)
  }
}
