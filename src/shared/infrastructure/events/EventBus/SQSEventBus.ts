import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Consumer } from 'sqs-consumer'
import { DomainEvent } from '../../../domain/events/DomainEvent'
import { DomainEventCode } from '../../../domain/events/DomainEventCode'
import { EventBus } from '../../../domain/models/hex/EventBus'
import { SQSConnection } from '../../queue/SQSConnection'
import { sleep } from '../../utils/sleep'
import { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper'

type MessageContent = {
  code: DomainEventCode
  eventId: string
  ocurredAt: string
  talkId: string
}

@Injectable()
export class SQSEventBus implements EventBus, OnModuleInit, OnModuleDestroy {
  private readonly sqsQueueUrl: string

  private readonly domainEventMapper: DomainEventMapper

  private readonly client: SQSConnection

  private consumer?: Consumer

  private processingEventsAmount = 0

  constructor(client: SQSConnection, sqsQueueUrl: string, domainEventMapper: DomainEventMapper) {
    this.sqsQueueUrl = sqsQueueUrl
    this.client = client
    this.domainEventMapper = domainEventMapper
  }

  async onModuleDestroy() {
    this.consumer?.stop()
    await this.waitForProcessingAllEvents()
  }

  public async waitForProcessingAllEvents() {
    while (this.processingEventsAmount > 0) {
      await sleep(50)
    }
  }

  async onModuleInit() {
    this.consumer = Consumer.create({
      sqs: this.client.getClient(),
      queueUrl: this.sqsQueueUrl,
      handleMessage: async ({ Body }) => {
        if (!Body) return
        await this.onMessage(JSON.parse(Body))
        this.processingEventsAmount -= 1
      },
      waitTimeSeconds: 3,
    })

    this.consumer.start()
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const command = new SendMessageCommand({
        MessageBody: JSON.stringify(event.toPrimitives()),
        QueueUrl: this.sqsQueueUrl,
        MessageAttributes: {
          id: { DataType: 'String', StringValue: event.eventId.toPrimitives() },
          executor_id: { DataType: 'String', StringValue: 'TODO' },
          type: { DataType: 'String', StringValue: event.code },
          occurred_at: { DataType: 'String', StringValue: event.occurredAt.toString() },
        },
      })
      await this.client.send(command)

      this.processingEventsAmount += 1
    }
  }

  private async onMessage(message: MessageContent) {
    if (!message) return

    const subscribersAndEvent = this.domainEventMapper.getSubscribersAndEvent(message.code)

    if (!subscribersAndEvent) {
      return
    }

    const { subscribers, eventClass } = subscribersAndEvent

    for await (const subscriber of subscribers) {
      const domainEvent = eventClass.fromPrimitives(message)
      await subscriber.on(domainEvent)
    }
  }
}
