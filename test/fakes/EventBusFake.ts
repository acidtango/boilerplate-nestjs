import { DomainEvent } from '../../src/shared/domain/events/DomainEvent'
import { EventBus } from '../../src/shared/domain/models/hex/EventBus'

export class EventBusFake implements EventBus {
  private readonly events: DomainEvent[] = []

  async publish(domainEvents: DomainEvent[]): Promise<void> {
    for (const domainEvent of domainEvents) {
      this.events.push(domainEvent)
    }
  }

  expectLastEventToBe(event: DomainEvent) {
    const lastEvent = this.events[this.events.length - 1]

    expect(lastEvent).toEqual({
      ...event,
      eventId: {
        id: expect.any(String),
      },
      occurredAt: expect.any(Date),
    })
  }
}
