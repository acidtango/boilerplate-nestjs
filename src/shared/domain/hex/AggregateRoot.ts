import { DomainEvent } from '../events/DomainEvent'

export abstract class AggregateRoot {
  private events: DomainEvent[] = []

  public recordEvent(event: DomainEvent) {
    this.events.push(event)
  }

  public pullDomainEvents() {
    const events = this.events
    this.flushEvents()
    return events
  }

  private flushEvents() {
    this.events = []
  }
}
