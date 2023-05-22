import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { Connection, Exchange, Message, Queue } from 'amqp-ts'
import { DomainEventCode } from '../../../domain/events/DomainEventCode'
import { EventBus } from '../../../domain/models/hex/EventBus'
import { Token } from '../../../domain/services/Token'
import { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper'
import { DomainEvent, DomainEventPrimitives } from '../../../domain/events/DomainEvent'

type MessageContent = {
  data: {
    executor_id: string
    type: DomainEventCode
    occurred_at: Date
    id: string
    attributes: DomainEventPrimitives
  }
  meta: unknown
}

@Injectable()
export class EventBusRabbitMQ implements EventBus, OnModuleInit {
  private readonly exchange: Exchange

  private readonly queue: Queue

  constructor(
    private readonly connection: Connection,
    @Inject(Token.DOMAIN_EVENT_MAPPER) private readonly domainEventMapper: DomainEventMapper
  ) {
    this.exchange = this.connection.declareExchange('DomainEvents', 'fanout', { durable: false })
    this.queue = this.connection.declareQueue('api-core')
  }

  async onModuleInit() {
    await this.loadEventListeners()
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => {
      const content: MessageContent = {
        data: {
          id: event.eventId.toPrimitives(),
          executor_id: 'TODO',
          type: event.code,
          occurred_at: event.occurredAt,
          attributes: event.toPrimitives(),
        },
        meta: {},
      }
      const message = new Message(content)
      this.exchange.send(message)
    })
  }

  private async loadEventListeners() {
    await this.queue.bind(this.exchange)
    await this.queue.activateConsumer((message: Message) => this.onMessage(message), {
      noAck: false,
    })
  }

  private async onMessage(message: Message) {
    const event = JSON.parse(message.content.toString()) as MessageContent
    if (!event) return

    const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(event.data.type)

    if (!subscribersAndEvent) {
      message.ack()
      return
    }

    const { subscribers, eventClass } = subscribersAndEvent

    for await (const subscriber of subscribers) {
      const domainEvent = eventClass.fromPrimitives(event.data.attributes)
      await subscriber.on(domainEvent)
    }

    message.ack()
  }
}
