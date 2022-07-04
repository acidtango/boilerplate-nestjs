import { DomainEventSubscriber } from '../../domain/events/DomainEventSubscriber'
import { DomainEvent, DomainEventClass } from '../../domain/events/DomainEvent'
import { DomainEventName } from '../../domain/events/DomainEventName'

export type SubscribersAndEvent = {
  subscribers: Array<DomainEventSubscriber<DomainEvent>>
  eventClass: DomainEventClass
}

export const DOMAIN_EVENT_MAPPER = 'DomainEventMapper'

export interface DomainEventMapper {
  getSubscribersAndEvent(eventName: DomainEventName): SubscribersAndEvent | undefined
}
