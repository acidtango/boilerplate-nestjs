import { UuidGeneratorRandom } from '../../infrastructure/services/uuid-generator/UuidGeneratorRandom'
import { Actor } from '../Actor'
import { DomainId } from '../hex/DomainId'
import { DomainEventName } from './DomainEventName'

export type DomainEventPrimitives = ReturnType<DomainEvent['toPrimitives']> &
  Record<string, unknown>
export abstract class DomainEvent {
  constructor(
    public readonly eventName: DomainEventName,
    public readonly aggregateId: DomainId,
    public readonly actor: Actor,
    public readonly eventId: DomainId = new DomainId(UuidGeneratorRandom.generate()),
    public readonly occurredAt: Date = new Date()
  ) {}

  static toPrimitives(e: DomainEvent) {
    return {
      eventName: e.eventName,
      eventId: e.eventId.toPrimitives(),
      aggregateId: e.aggregateId.toPrimitives(),
      occurredAt: e.occurredAt,
      actor: e.actor.toPrimitives(),
    }
  }

  toPrimitives() {
    return DomainEvent.toPrimitives(this)
  }
}

export type DomainEventClass = {
  eventName: DomainEventName
}
