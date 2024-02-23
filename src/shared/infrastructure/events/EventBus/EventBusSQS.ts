import {
  CreateQueueCommand,
  PurgeQueueCommand,
  SendMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs'
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Consumer } from 'sqs-consumer'
import { DomainEvent } from '../../../domain/events/DomainEvent'
import { DomainEventCode } from '../../../domain/events/DomainEventCode'
import { EventBus } from '../../../domain/models/hex/EventBus'
import { Token } from '../../../domain/services/Token'
import { sleep } from '../../utils/sleep'
import { DomainEventMapper } from '../DomainEventMapper/DomainEventMapper'
import { config } from '../../config'

type MessageContent = {
  code: DomainEventCode
  eventId: string
  occurredAt: string
  talkId: string
}

@Injectable()
export class EventBusSQS implements EventBus, OnModuleInit, OnModuleDestroy {
  private queueUrl: string

  private readonly domainEventMapper: DomainEventMapper

  private readonly client: SQSClient

  private consumer?: Consumer

  private processingEventsAmount = 0

  constructor(@Inject(Token.DOMAIN_EVENT_MAPPER) domainEventMapper: DomainEventMapper) {
    this.client = new SQSClient({
      credentials: {
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secretAccessKey,
      },
      region: config.aws.region,
      endpoint: config.aws.endpoint,
    })

    this.domainEventMapper = domainEventMapper
    this.queueUrl = config.aws.sqs.url
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
      queueUrl: this.queueUrl,
      handleMessage: async ({ Body }) => {
        if (!Body) return
        await this.onMessage(JSON.parse(Body))
        this.processingEventsAmount -= 1
      },
      waitTimeSeconds: 0,
    })

    this.consumer.start()
  }

  async createQueue() {
    const createQueueCommand = new CreateQueueCommand({ QueueName: 'localstack-queue' })
    const { QueueUrl } = await this.client.send(createQueueCommand)

    if (!QueueUrl) {
      throw new Error('Could not create queue')
    }

    console.log('Queue URL', QueueUrl)

    this.queueUrl = QueueUrl
  }

  async destroyQueue() {
    await this.client.send(new PurgeQueueCommand({ QueueUrl: this.queueUrl }))
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const command = new SendMessageCommand({
        MessageBody: JSON.stringify(event.toPrimitives()),
        QueueUrl: this.queueUrl,
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
