import { DomainEvent } from '../../events/DomainEvent'

export abstract class AggregateRoot {
  private recordedEvents: DomainEvent[] = []

  protected recordEvent(event: DomainEvent) {
    this.recordedEvents.push(event)
  }

  pullDomainEvents() {
    const recordedEvents = this.recordedEvents
    this.recordedEvents = []
    return recordedEvents
  }
}
