import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { DomainEventCode } from '../../../domain/events/DomainEventCode'
import { EventBus } from '../../../domain/models/hex/EventBus'
import { Token } from '../../../domain/services/Token'
import { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper'
import { DomainEvent, DomainEventPrimitives } from '../../../domain/events/DomainEvent'
import { RabbitConnection } from '../../queue/RabbitConnection'
import { Channel } from 'amqplib'

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
  private static readonly QUEUE = 'DomainEvents'

  private receiveChannel?: Channel

  private sendChannel?: Channel

  constructor(
    private readonly connection: RabbitConnection,
    @Inject(Token.DOMAIN_EVENT_MAPPER) private readonly domainEventMapper: DomainEventMapper
  ) {}

  async onModuleInit() {
    this.sendChannel = await this.connection.createChannel()
    this.receiveChannel = await this.connection.createChannel()

    await this.getReceiveChannel().assertQueue(EventBusRabbitMQ.QUEUE)

    await this.getReceiveChannel().consume(EventBusRabbitMQ.QUEUE, (message) => {
      if (!message) return
      this.getReceiveChannel().ack(message)
      this.onMessage(JSON.parse(message.content.toString()))
    })
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
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

      this.getSendChannel().sendToQueue(
        EventBusRabbitMQ.QUEUE,
        Buffer.from(JSON.stringify(content))
      )
    }
  }

  private async onMessage(message: MessageContent) {
    if (!message) return

    const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(message.data.type)

    if (!subscribersAndEvent) {
      return
    }

    const { subscribers, eventClass } = subscribersAndEvent

    for await (const subscriber of subscribers) {
      const domainEvent = eventClass.fromPrimitives(message.data.attributes)
      await subscriber.on(domainEvent)
    }
  }

  private getSendChannel(): Channel {
    if (!this.sendChannel) {
      throw new Error('EventBusRabbitMQ not initialized')
    }

    return this.sendChannel
  }

  private getReceiveChannel(): Channel {
    if (!this.receiveChannel) {
      throw new Error('EventBusRabbitMQ not initialized')
    }

    return this.receiveChannel
  }
}
