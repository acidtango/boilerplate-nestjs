import { DomainEventMapper, SubscribersAndEvent } from './DomainEventMapper'
import { UserCreated } from '../../../application/users/domain/events/UserCreated'
import { DomainEventSubscriber } from '../../domain/events/DomainEventSubscriber'
import { DomainEvent } from '../../domain/events/DomainEvent'

export class DomainEventMapperFake implements DomainEventMapper {
  constructor(private subscriber: DomainEventSubscriber<DomainEvent>) {}

  getSubscribersAndEvent(): SubscribersAndEvent | undefined {
    return {
      subscribers: [this.subscriber],
      eventClass: UserCreated,
    }
  }
}
