import type { interfaces } from 'inversify'
import { UseCase } from '../../shared/domain/models/hex/UseCase.ts'
import { EventDateRange } from '../domain/models/EventDateRange.ts'
import { EventId } from '../../shared/domain/models/ids/EventId.ts'
import { EventName } from '../domain/models/EventName.ts'
import { EventProposalsDateRange } from '../domain/models/EventProposalsDateRange.ts'
import { TalkEvent } from '../domain/models/TalkEvent.ts'
import type { EventRepository } from '../domain/repositories/EventRepository.ts'
import { EventAlreadyCreatedError } from '../domain/errors/EventAlreadyCreatedError.ts'
import { Token } from '../../shared/domain/services/Token.ts'

export type CreateEventParams = {
  id: EventId
  name: EventName
  dateRange: EventDateRange
  proposalsDateRange: EventProposalsDateRange
}

export class CreateEvent extends UseCase {
  public static async create({ container }: interfaces.Context) {
    return new CreateEvent(await container.getAsync(Token.EVENT_REPOSITORY))
  }

  private readonly eventRepository: EventRepository

  constructor(eventRepository: EventRepository) {
    super()
    this.eventRepository = eventRepository
  }

  async execute({ dateRange, id, name, proposalsDateRange }: CreateEventParams) {
    if (await this.eventRepository.exists(id)) {
      throw new EventAlreadyCreatedError(id)
    }

    const talkEvent = TalkEvent.create(id, name, dateRange, proposalsDateRange)

    await this.eventRepository.save(talkEvent)
  }
}
