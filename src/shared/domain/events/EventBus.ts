import { AggregateRoot } from '../hex/AggregateRoot'
import { DomainId } from '../hex/DomainId'

export const EVENT_BUS_TOKEN = 'EventBus'

/**
 * TODO: naming
 */
export type AggregateAndExecutor = {
  aggregateRoot: AggregateRoot
  executorId: DomainId // Executor? Actor? Owner?. Better inside DomainEvent
}

export interface EventBus {
  /**
   * TODO: Refactor
   */
  publishEventsOf(aggregate: AggregateRoot): Promise<void>
}
