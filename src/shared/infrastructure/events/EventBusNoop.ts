import { EventBus } from '../../domain/hex/EventBus'
import { DomainEvent } from '../../domain/events/DomainEvent'

export class EventBusNoop implements EventBus {
  async publish(domainEvents: DomainEvent[]): Promise<void> {}
}
