import { Inject, Injectable } from '@nestjs/common'
import { EventBus } from '../../domain/events/EventBus'
import { AggregateRoot } from '../../domain/hex/AggregateRoot'
import { DomainEventRepositoryTypeORM } from '../repositories/DomainEventRepositoryTypeORM'
import { DomainEventMapper, DOMAIN_EVENT_MAPPER } from './DomainEventMapper'

@Injectable()
export class EventBusMemory implements EventBus {
  constructor(
    @Inject(DOMAIN_EVENT_MAPPER) private readonly domainEventMapper: DomainEventMapper,
    private readonly domainEventRepository: DomainEventRepositoryTypeORM
  ) {}

  async publishEventsOf(aggregateRoot: AggregateRoot): Promise<void> {
    const events = aggregateRoot.pullDomainEvents()

    for await (const event of events) {
      const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(event.eventName)

      if (!subscribersAndEvent) return

      const { subscribers, eventClass } = subscribersAndEvent

      if (!subscribers || !eventClass) return

      for await (const subscriber of subscribers) {
        try {
          await subscriber.on(event)
          this.domainEventRepository.saveSucceed(event, subscriber)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          this.domainEventRepository.saveFailed(event, subscriber, error.toString())
          throw error
        }
      }
    }
  }
}
