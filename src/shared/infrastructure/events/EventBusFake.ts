import { Inject, Injectable } from '@nestjs/common'
import { EventBus } from '../../domain/events/EventBus'
import { DomainEvent } from '../../domain/events/DomainEvent'
import { DOMAIN_EVENT_MAPPER, DomainEventMapper } from './DomainEventMapper'

@Injectable()
export class EventBusFake implements EventBus {
  constructor(@Inject(DOMAIN_EVENT_MAPPER) private readonly domainEventMapper: DomainEventMapper) {}

  async publish(events: Array<DomainEvent>): Promise<void> {
    for await (const event of events) {
      const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(event.eventName)

      if (!subscribersAndEvent) return

      const { subscribers, eventClass } = subscribersAndEvent

      if (!subscribers || !eventClass) return

      for await (const subscriber of subscribers) {
        await subscriber.on(event)
      }
    }
  }
}
