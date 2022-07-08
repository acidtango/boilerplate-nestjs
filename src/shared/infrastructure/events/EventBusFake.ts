import { Inject, Injectable } from '@nestjs/common'
import { EventBus, AggregateAndExecutor } from '../../domain/events/EventBus'
import { DomainEvent } from '../../domain/events/DomainEvent'
import { DOMAIN_EVENT_MAPPER, DomainEventMapper } from './DomainEventMapper'

@Injectable()
export class EventBusFake implements EventBus {
  constructor(@Inject(DOMAIN_EVENT_MAPPER) private readonly domainEventMapper: DomainEventMapper) {}

  async publishEventsOf({ aggregateRoot, executorId }: AggregateAndExecutor): Promise<void> {
    const events = aggregateRoot.pullDomainEvents()

    for await (const event of events) {
      const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(event.eventName)

      if (!subscribersAndEvent) return

      const { subscribers, eventClass } = subscribersAndEvent

      if (!subscribers || !eventClass) return

      for await (const subscriber of subscribers) {
        await subscriber.on(event, executorId)
      }
    }
  }
}
