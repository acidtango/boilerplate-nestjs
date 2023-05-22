import { DomainEventCode } from './DomainEventCode'
import { DomainId } from '../models/hex/DomainId'
import { UuidGeneratorRandom } from '../../infrastructure/services/uuid-generator/UuidGeneratorRandom'
import { Primitives } from '../models/hex/Primitives'

export type DomainEventPrimitives = Primitives<DomainEvent> & Record<string, unknown>

export abstract class DomainEvent {
  static toPrimitives(e: DomainEvent) {
    return {
      code: e.code,
      eventId: e.eventId.toPrimitives(),
      occurredAt: e.occurredAt,
    }
  }

  protected constructor(
    public readonly code: DomainEventCode,
    public readonly eventId: DomainId = new DomainId(UuidGeneratorRandom.generate()),
    public readonly occurredAt: Date = new Date()
  ) {}

  toPrimitives() {
    return DomainEvent.toPrimitives(this)
  }
}

export type DomainEventClass = {
  code: DomainEventCode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromPrimitives: (primitives: any) => DomainEvent
}
