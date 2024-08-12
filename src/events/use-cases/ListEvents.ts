import type { interfaces } from 'inversify'
import { UseCase } from '../../shared/domain/models/hex/UseCase.ts'
import { TalkEvent } from '../domain/models/TalkEvent.ts'
import type { EventRepository } from '../domain/repositories/EventRepository.ts'
import { Token } from '../../shared/domain/services/Token.ts'

export class ListEvents extends UseCase {
  private readonly eventRepository: EventRepository

  public static create({ container }: interfaces.Context) {
    return new ListEvents(container.get(Token.EVENT_REPOSITORY))
  }

  constructor(eventRepository: EventRepository) {
    super()
    this.eventRepository = eventRepository
  }

  async execute(): Promise<TalkEvent[]> {
    return this.eventRepository.findAll()
  }
}
