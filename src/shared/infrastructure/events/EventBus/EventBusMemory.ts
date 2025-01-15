import type { interfaces } from 'inversify'
import type { EventBus } from '../../../domain/models/hex/EventBus.ts'
import { DomainEvent } from '../../../domain/events/DomainEvent.ts'
import type { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper.ts'
import { Token } from '../../../domain/services/Token.ts'

export class EventBusMemory implements EventBus {
  public static create({ container }: interfaces.Context) {
    return new EventBusMemory(container.get(Token.DOMAIN_EVENT_MAPPER))
  }

  constructor(private readonly domainEventMapper: DomainEventMapper) {}

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
