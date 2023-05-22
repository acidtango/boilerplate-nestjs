import { Inject, Injectable } from '@nestjs/common'
import { EventBus } from '../../../domain/models/hex/EventBus'
import { DomainEvent } from '../../../domain/events/DomainEvent'
import { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper'
import { Token } from '../../../domain/services/Token'

@Injectable()
export class EventBusMemory implements EventBus {
  constructor(
    @Inject(Token.DOMAIN_EVENT_MAPPER) private readonly domainEventMapper: DomainEventMapper
  ) {}

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
