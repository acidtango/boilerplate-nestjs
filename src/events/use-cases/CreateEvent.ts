import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { EventDateRange } from '../domain/models/EventDateRange'
import { EventId } from '../../shared/domain/models/ids/EventId'
import { EventName } from '../domain/models/EventName'
import { EventProposalsDateRange } from '../domain/models/EventProposalsDateRange'
import { TalkEvent } from '../domain/models/TalkEvent'
import { EventRepository } from '../domain/repositories/EventRepository'
import { Inject } from '@nestjs/common'
import { Token } from '../../shared/domain/services/Token'
import { EventAlreadyCreatedError } from '../domain/errors/EventAlreadyCreatedError'

export type CreateEventParams = {
  id: EventId
  name: EventName
  dateRange: EventDateRange
  proposalsDateRange: EventProposalsDateRange
}

export class CreateEvent extends UseCase {
  constructor(@Inject(Token.EVENT_REPOSITORY) private readonly eventRepository: EventRepository) {
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
