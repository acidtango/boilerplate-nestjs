import { CreateQueueCommand, PurgeQueueCommand, SQSClient } from '@aws-sdk/client-sqs'
import { juniorXpId } from '../../../../../test/mother/TalkMother/JuniorXp'
import { waitFor } from '../../../../../test/utils/waitFor'
import { TalkProposed } from '../../../../talks/domain/events/TalkProposed'
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber'
import { config } from '../../config'
import { SQSQueueUrl } from '../../queue/SQSConnectionUrl'
import { SQSQueueClient } from '../../queue/SQSQueueClient'
import { DomainEventMapperFake } from '../DomainEventMapper/DomainEventMapperFake'
import { SQSQueueEventBus } from './SQSQueueEventBus'

describe('SQSQueueEventBus', () => {
  let eventBus: SQSQueueEventBus
  let userCreatedSubscriber: DomainEventSubscriberFake
  let sqsClient: SQSQueueClient
  let queueUrl: SQSQueueUrl

  beforeEach(async () => {
    const anyAccesKey = 'na'
    const anyPrivateAccessKey = 'na'
    const defaultRegion = 'eu-west-1'
    const localEndpoint = `http://${config.sqs.host}:${config.sqs.port}`
    sqsClient = new SQSQueueClient(
      new SQSClient({
        credentials: {
          accessKeyId: anyAccesKey,
          secretAccessKey: anyPrivateAccessKey,
        },
        region: defaultRegion,
        endpoint: localEndpoint,
      })
    )
    const localQueueName = 'cola-de-prueba1'
    const createQueueCommand = new CreateQueueCommand({
      QueueName: localQueueName,
    })
    const response = await sqsClient.getClient().send(createQueueCommand)
    queueUrl = new SQSQueueUrl(response.QueueUrl ?? '')
    userCreatedSubscriber = new DomainEventSubscriberFake()
    const domainEventMapper = new DomainEventMapperFake(userCreatedSubscriber)
    eventBus = new SQSQueueEventBus(sqsClient, queueUrl, domainEventMapper)
    await eventBus.onModuleInit()
  })

  afterEach(async () => {
    await sqsClient.getClient().send(new PurgeQueueCommand({ QueueUrl: queueUrl.getValue() }))
  })

  afterAll(async () => {
    await eventBus.onModuleDestroy()
  })

  it('sends the event and calls the given subscriber', async () => {
    const event = TalkProposed.emit(juniorXpId())

    await eventBus.publish([event])

    await waitFor(async () => {
      userCreatedSubscriber.expectToHaveReceivedEvent(event)
    })
  })
})

class DomainEventSubscriberFake implements DomainEventSubscriber<TalkProposed> {
  private eventReceived?: TalkProposed

  async on(domainEvent: TalkProposed): Promise<void> {
    this.eventReceived = domainEvent
  }

  expectToHaveReceivedEvent(event: TalkProposed) {
    expect(this.eventReceived).toEqual(event)
  }
}
