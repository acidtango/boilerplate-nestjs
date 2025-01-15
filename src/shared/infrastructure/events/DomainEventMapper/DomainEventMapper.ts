import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber.ts'
import { DomainEvent, type DomainEventClass } from '../../../domain/events/DomainEvent.ts'
import { DomainEventCode } from '../../../domain/events/DomainEventCode.ts'

export type SubscribersAndEvent = {
  subscribers: Array<DomainEventSubscriber<DomainEvent>>
  eventClass: DomainEventClass
}

export interface DomainEventMapper {
  getSubscribersAndEvent(code: DomainEventCode): SubscribersAndEvent | undefined
}
