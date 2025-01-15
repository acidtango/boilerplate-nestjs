import type { interfaces } from 'inversify'
import { type DomainEventMapper, type SubscribersAndEvent } from './DomainEventMapper.ts'
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber.ts'
import { DomainEvent } from '../../../domain/events/DomainEvent.ts'
import { TalkProposed } from '../../../../talks/domain/events/TalkProposed.ts'
import { TalkProposedSubscriber } from '../../../../talks/use-cases/subscribers/TalkProposedSubscriber.js'
import { DomainEventCode } from '../../../domain/events/DomainEventCode.js'

export class DomainEventMapperFake implements DomainEventMapper {
  public static create({ container }: interfaces.Context) {
    return new DomainEventMapperFake(container.get(TalkProposedSubscriber))
  }

  constructor(private readonly subscriber: DomainEventSubscriber<DomainEvent>) {}

  getSubscribersAndEvent(code: DomainEventCode): SubscribersAndEvent | undefined {
    if (code !== DomainEventCode.TALK_PROPOSED) {
      return
    }

    return {
      subscribers: [this.subscriber],
      eventClass: TalkProposed,
    }
  }
}
