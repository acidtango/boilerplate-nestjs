import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { TalkEvent } from '../domain/models/TalkEvent'
import { EventRepository } from '../domain/repositories/EventRepository'
import { Inject } from '@nestjs/common'
import { Token } from '../../shared/domain/services/Token'

export class ListEvents extends UseCase {
  constructor(@Inject(Token.EVENT_REPOSITORY) private readonly eventRepository: EventRepository) {
    super()
  }

  async execute(): Promise<TalkEvent[]> {
    return this.eventRepository.findAll()
  }
}
