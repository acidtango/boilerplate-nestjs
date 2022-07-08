import { AggregateRoot } from '../hex/AggregateRoot'
import { DomainId } from '../hex/DomainId'
import { DomainEvent } from './DomainEvent'

export const EVENT_BUS_TOKEN = 'EventBus'

/**
 * TODO: naming
 */
export type AggregateAndExecutor = {
  aggregateRoot: AggregateRoot
  executorId: DomainId // Executor? Actor? Owner?
}

export interface EventBus {
  /**
   * TODO: Refactor
   */
  publishEventsOf(todo: AggregateAndExecutor): Promise<void>
}
