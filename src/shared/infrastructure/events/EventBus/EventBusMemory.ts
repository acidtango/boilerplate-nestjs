import type { interfaces } from 'inversify'
import type { EventBus } from '../../../domain/models/hex/EventBus.ts'
import { DomainEvent, type DomainEventPrimitives } from '../../../domain/events/DomainEvent.ts'
import type { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper.ts'
import { Token } from '../../../domain/services/Token.ts'
import { sleep } from '../../utils/sleep.js'

export class EventBusMemory implements EventBus {
  public static async create({ container }: interfaces.Context) {
    return new EventBusMemory(await container.getAsync(Token.DOMAIN_EVENT_MAPPER))
  }

  private readonly domainEventMapper: DomainEventMapper

  private promises: Array<Promise<unknown>> = []

  constructor(domainEventMapper: DomainEventMapper) {
    this.domainEventMapper = domainEventMapper
  }

  async publish(domainEvents: DomainEvent[]): Promise<void> {
    domainEvents.forEach((event) => {
      const promise = sleep(0).then(() => this.handle(event.toPrimitives()))
      this.promises.push(promise)
    })
  }

  async handle(event: DomainEventPrimitives) {
    const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(event.code)

    if (!subscribersAndEvent) {
      return
    }

    const { subscribers, eventClass } = subscribersAndEvent

    for await (const subscriber of subscribers) {
      const domainEvent = eventClass.fromPrimitives(event)
      await subscriber.on(domainEvent)
    }
  }

  waitForEvents() {
    return Promise.all(this.promises)
  }
}
