import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber'
import { DomainEvent, DomainEventClass } from '../../../domain/events/DomainEvent'
import { DomainEventCode } from '../../../domain/events/DomainEventCode'

export type SubscribersAndEvent = {
  subscribers: Array<DomainEventSubscriber<DomainEvent>>
  eventClass: DomainEventClass
}

export interface DomainEventMapper {
  getSubscribersAndEvent(code: DomainEventCode): SubscribersAndEvent | undefined
}
