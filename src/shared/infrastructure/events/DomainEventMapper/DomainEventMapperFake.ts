import { DomainEventMapper, SubscribersAndEvent } from './DomainEventMapper'
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber'
import { DomainEvent } from '../../../domain/events/DomainEvent'
import { TalkProposed } from '../../../../talks/domain/events/TalkProposed'

export class DomainEventMapperFake implements DomainEventMapper {
  constructor(private readonly subscriber: DomainEventSubscriber<DomainEvent>) {}

  getSubscribersAndEvent(): SubscribersAndEvent | undefined {
    return {
      subscribers: [this.subscriber],
      eventClass: TalkProposed,
    }
  }
}
