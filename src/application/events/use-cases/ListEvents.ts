import { UseCase } from '../../../shared/domain/hex/UseCase'
import { TalkEvent } from '../domain/TalkEvent'
import { EventRepository } from '../domain/EventRepository'
import { Inject } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'

export class ListEvents extends UseCase {
  constructor(@Inject(AppProvider.EVENT_REPOSITORY) private readonly eventRepository: EventRepository) {
    super()
  }

  async execute(): Promise<TalkEvent[]> {
    return this.eventRepository.findAll()
  }
}
