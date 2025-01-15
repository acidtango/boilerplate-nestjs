import { Injectable } from '@nestjs/common'
import { DomainEventCode } from '../../../domain/events/DomainEventCode'
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber'
import { DomainEvent, DomainEventClass } from '../../../domain/events/DomainEvent'
import { DiscoveryService, Reflector } from '@nestjs/core'
import { EVENT_HANDLER_METADATA, HandleEventMetadata } from '../../../domain/events/HandleEvent'
import { DomainEventMapper, SubscribersAndEvent } from './DomainEventMapper'

@Injectable()
export class DomainEventMapperNest implements DomainEventMapper {
  private readonly subscribers: Map<DomainEventCode, Array<DomainEventSubscriber<DomainEvent>>>

  private readonly eventClasses: Map<DomainEventCode, DomainEventClass>

  constructor(
    private readonly reflector: Reflector,
    private readonly discoveryService: DiscoveryService
  ) {
    this.subscribers = new Map()
    this.eventClasses = new Map()
  }

  onApplicationBootstrap() {
    this.loadEventSubscribers()
  }

  getSubscribersAndEvent(code: DomainEventCode): SubscribersAndEvent | undefined {
    const subscribers = this.subscribers.get(code)
    const eventClass = this.eventClasses.get(code)

    if (!subscribers || !eventClass) return

    return {
      subscribers,
      eventClass,
    }
  }

  private loadEventSubscribers() {
    const subscribers = this.discoveryService
      .getProviders()
      .map((wrapper) => wrapper.instance)
      .filter(DomainEventSubscriber.isInstance)

    subscribers.forEach((subscriber) => {
      const { event } = this.reflector.get<HandleEventMetadata>(
        EVENT_HANDLER_METADATA,
        subscriber.on
      )

      const previousSubscribers = this.subscribers.get(event.code) ?? []
      this.subscribers.set(event.code, previousSubscribers.concat(subscriber))
      this.eventClasses.set(event.code, event)
    })
  }
}
