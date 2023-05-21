import { AggregateRoot } from '../../src/shared/domain/models/hex/AggregateRoot'

export function exampleSalt() {
  return 'salt'
}

export function flushDomainEvents<T extends AggregateRoot>(aggregate: T) {
  // pull domain events in order to flush them
  aggregate.pullDomainEvents()
  return aggregate
}
