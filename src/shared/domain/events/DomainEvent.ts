import { UuidGeneratorRandom } from '../../infrastructure/services/uuid-generator/UuidGeneratorRandom'
import { DomainEventName } from './DomainEventName'
import { DomainId } from '../hex/DomainId'

export abstract class DomainEvent {
  static fromPrimitives: (...args: any[]) => any

  constructor(
    public readonly eventName: DomainEventName,
    public readonly aggregateId: DomainId,
    public readonly eventId: DomainId = new DomainId(UuidGeneratorRandom.generate()),
    public readonly occurredAt: Date = new Date()
  ) {}

  abstract toPrimitives(): Object
}

export type DomainEventClass = {
  eventName: DomainEventName
  fromPrimitives(...args: any[]): DomainEvent
}
