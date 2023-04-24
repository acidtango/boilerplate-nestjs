import { DomainEventCode } from './DomainEventCode'

export class DomainEvent {
  constructor(private readonly code: DomainEventCode) {}
}
