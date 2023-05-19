import { DomainEvent } from '../../src/shared/domain/events/DomainEvent'
import { EventBus } from '../../src/shared/domain/hex/EventBus'

export class EventBusNoopFake implements EventBus {
  private readonly events: DomainEvent[] = []

  async publish(domainEvents: DomainEvent[]): Promise<void> {
    for (const domainEvent of domainEvents) {
      this.events.push(domainEvent)
    }
  }

  expectLastEventToBe(event: DomainEvent) {
    expect(this.events[this.events.length - 1]).toEqual(event)
  }
}
