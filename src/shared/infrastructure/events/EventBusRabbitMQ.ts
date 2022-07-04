import { Inject, Injectable, Logger } from '@nestjs/common'
import { Connection, Exchange, Message, Queue } from 'amqp-ts'
import { EventBus } from '../../domain/events/EventBus'
import { DomainEvent } from '../../domain/events/DomainEvent'
import { DomainEventName } from '../../domain/events/DomainEventName'
import { DOMAIN_EVENT_MAPPER, DomainEventMapper } from './DomainEventMapper'

type MessageContent = {
  data: {
    type: DomainEventName
    occurred_at: Date
    id: string
    attributes: unknown
  }
  meta: unknown
}

@Injectable()
export class EventBusRabbitMQ implements EventBus {
  private readonly connection: Connection

  private readonly exchange: Exchange

  private readonly queue: Queue

  private readonly logger = new Logger(EventBusRabbitMQ.name)

  constructor(@Inject(DOMAIN_EVENT_MAPPER) private readonly domainEventMapper: DomainEventMapper) {
    this.connection = new Connection(`amqp://acid:password@localhost:5672`)
    this.exchange = this.connection.declareExchange('DomainEvents', 'fanout', { durable: false })
    this.queue = this.connection.declareQueue('api-core')
  }

  async onApplicationBootstrap() {
    await this.loadEventListeners()
  }

  async onApplicationShutdown() {
    await this.connection.close()
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    for await (const event of events) {
      const content: MessageContent = {
        data: {
          type: event.eventName,
          occurred_at: event.occurredAt,
          id: event.eventId.toPrimitives(),
          attributes: event.toPrimitives(),
        },
        meta: {},
      }

      const message = new Message(content)
      this.logger.log(`Event to be published: ${event.eventName}`)
      await this.exchange.send(message)
    }
  }

  private async loadEventListeners() {
    await this.queue.bind(this.exchange)
    await this.queue.activateConsumer((message) => this.onMessage(message), { noAck: false })
  }

  private async onMessage(message: Message) {
    const event = JSON.parse(message.content.toString()) as MessageContent
    if (!event) return

    const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(event.data.type)

    if (!subscribersAndEvent) return

    const { subscribers, eventClass } = subscribersAndEvent

    for await (const subscriber of subscribers) {
      const domainEvent = eventClass.fromPrimitives(event.data.attributes)
      await subscriber.on(domainEvent)
    }

    message.ack()
  }
}
