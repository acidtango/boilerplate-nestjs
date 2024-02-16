import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Consumer } from 'sqs-consumer'
import { DomainEvent } from '../../../domain/events/DomainEvent'
import { DomainEventCode } from '../../../domain/events/DomainEventCode'
import { EventBus } from '../../../domain/models/hex/EventBus'
import { Token } from '../../../domain/services/Token'
import { SQSQueueUrl } from '../../queue/SQSConnectionUrl'
import { SQSQueueClient } from '../../queue/SQSQueueClient'
import { sleep } from '../../utils/sleep'
import { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper'

type MessageContent = {
  code: DomainEventCode
  eventId: string
  ocurredAt: string
  talkId: string
}

@Injectable()
export class EventBusSQS implements EventBus, OnModuleInit, OnModuleDestroy {
  private readonly sqsQueueUrl: SQSQueueUrl

  private readonly domainEventMapper: DomainEventMapper

  private readonly client: SQSClient

  private consumer?: Consumer

  private processingEventsAmount = 0

  constructor(
    client: SQSQueueClient,
    sqsQueueUrl: SQSQueueUrl,
    @Inject(Token.DOMAIN_EVENT_MAPPER) domainEventMapper: DomainEventMapper
  ) {
    this.sqsQueueUrl = sqsQueueUrl
    this.client = client.getClient()
    this.domainEventMapper = domainEventMapper
  }

  async onModuleDestroy() {
    this.consumer?.stop()
    this.client.destroy()
    await this.waitForProcessingAllEvents()
  }

  public async waitForProcessingAllEvents() {
    while (this.processingEventsAmount > 0) {
      await sleep(50)
    }
  }

  async onModuleInit() {
    this.consumer = Consumer.create({
      sqs: this.client,
      queueUrl: this.sqsQueueUrl.getValue(),
      handleMessage: async ({ Body }) => {
        if (!Body) return
        await this.onMessage(JSON.parse(Body))
        this.processingEventsAmount -= 1
      },
      waitTimeSeconds: 0,
    })

    this.consumer.start()
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const command = new SendMessageCommand({
        MessageBody: JSON.stringify(event.toPrimitives()),
        QueueUrl: this.sqsQueueUrl.getValue(),
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
