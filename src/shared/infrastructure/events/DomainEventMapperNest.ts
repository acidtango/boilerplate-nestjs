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

  private readonly eventClasses: Map<DomainEventName, DomainEventClass>

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

      const previousSubscribers = this.subscribers.get(event.eventName) ?? []
      this.subscribers.set(event.eventName, previousSubscribers.concat(subscriber))
      this.eventClasses.set(event.eventName, event)
    })
  }

  getSubscribersAndEvent(eventName: DomainEventName): SubscribersAndEvent | undefined {
    const subscribers = this.subscribers.get(eventName)
    const eventClass = this.eventClasses.get(eventName)

    if (!subscribers || !eventClass) return

    return {
      subscribers,
      eventClass,
    }
  }
}
