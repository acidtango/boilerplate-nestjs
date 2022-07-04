import { DomainEvent } from './DomainEvent'

export const EVENT_BUS_TOKEN = 'EventBus'

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>
}
