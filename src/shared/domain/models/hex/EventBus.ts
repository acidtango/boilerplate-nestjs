import { DomainEvent } from '../../events/DomainEvent'

export interface EventBus {
  publish(domainEvents: DomainEvent[]): Promise<void>
}
