import type { interfaces } from 'inversify'
import type { EventBus } from '../../../domain/models/hex/EventBus.ts'
import { DomainEvent } from '../../../domain/events/DomainEvent.ts'
import type { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper.ts'
import { Token } from '../../../domain/services/Token.ts'

export class EventBusMemory implements EventBus {
  public static async create({ container }: interfaces.Context) {
    return new EventBusMemory(await container.getAsync(Token.DOMAIN_EVENT_MAPPER))
  }

  private readonly domainEventMapper: DomainEventMapper

  constructor(domainEventMapper: DomainEventMapper) {
    this.domainEventMapper = domainEventMapper
  }

  async publish(domainEvents: DomainEvent[]): Promise<void> {
    for await (const event of domainEvents) {
      const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(event.code)

      if (!subscribersAndEvent) return

      const { subscribers, eventClass } = subscribersAndEvent

      if (!subscribers || !eventClass) return

      for await (const subscriber of subscribers) {
        try {
          await subscriber.on(event)
        } catch (error: unknown) {
          console.error('TODO: Correctly manage error', error)
          throw error
        }
      }
    }
  }
}
