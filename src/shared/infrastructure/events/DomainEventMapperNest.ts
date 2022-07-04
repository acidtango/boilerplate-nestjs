import { Injectable } from '@nestjs/common'
import { DomainEventName } from '../../domain/events/DomainEventName'
import { DomainEventSubscriber } from '../../domain/events/DomainEventSubscriber'
import { DomainEvent, DomainEventClass } from '../../domain/events/DomainEvent'
import { DiscoveryService, Reflector } from '@nestjs/core'
import { EVENT_HANDLER_METADATA, HandleEventMetadata } from '../../domain/events/HandleEvent'
import { DomainEventMapper, SubscribersAndEvent } from './DomainEventMapper'

@Injectable()
export class DomainEventMapperNest implements DomainEventMapper {
  private readonly subscribers: Map<DomainEventName, Array<DomainEventSubscriber<DomainEvent>>>

  private readonly classes: Map<DomainEventName, DomainEventClass>

  constructor(
    private readonly reflector: Reflector,
    private readonly discoveryService: DiscoveryService
  ) {
    this.subscribers = new Map()
    this.classes = new Map()
  }

  onApplicationBootstrap() {
    this.loadEventSubscribers()
  }

  private loadEventSubscribers() {
    const subscribers = this.discoveryService
      .getProviders()
      .map((wrapper) => wrapper.instance)
      .filter(DomainEventSubscriber.isInstance)

    for (const subscriber of subscribers) {
      const { event } = this.reflector.get(
        EVENT_HANDLER_METADATA,
        subscriber.on
      ) as HandleEventMetadata

      const previousSubscribers = this.subscribers.get(event.eventName) ?? []
      this.subscribers.set(event.eventName, previousSubscribers.concat(subscriber))
      this.classes.set(event.eventName, event)
    }
  }

  getSubscribersAndEvent(eventName: DomainEventName): SubscribersAndEvent | undefined {
    const subscribers = this.subscribers.get(eventName)
    const eventClass = this.classes.get(eventName)

    if (!subscribers || !eventClass) return

    return {
      subscribers,
      eventClass,
    }
  }
}
