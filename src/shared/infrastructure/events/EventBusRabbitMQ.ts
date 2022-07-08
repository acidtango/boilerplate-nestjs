import { Inject, Injectable, Logger } from '@nestjs/common'
import { Connection, Exchange, Message, Queue } from 'amqp-ts'
import { EventBus, AggregateAndExecutor } from '../../domain/events/EventBus'
import { DomainEvent } from '../../domain/events/DomainEvent'
import { DomainEventName } from '../../domain/events/DomainEventName'
import { DOMAIN_EVENT_MAPPER, DomainEventMapper } from './DomainEventMapper'
import { DomainId } from '../../domain/hex/DomainId'

type MessageContent = {
  data: {
    executor_id: string
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

  /**
   * TODO: Move to module lifecycle
   */
  async onApplicationShutdown() {
    await this.stop()
  }

  async stop() {
    await this.connection.close()
  }

  async publishEventsOf({ aggregateRoot, executorId }: AggregateAndExecutor): Promise<void> {
    const events = aggregateRoot.pullDomainEvents()

    for await (const event of events) {
      const content: MessageContent = {
        data: {
          id: event.eventId.toPrimitives(),
          executor_id: executorId.toPrimitives(),
          type: event.eventName,
          occurred_at: event.occurredAt,
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
      await subscriber.on(domainEvent, new DomainId(event.data.executor_id))
    }

    message.ack()
  }
}
