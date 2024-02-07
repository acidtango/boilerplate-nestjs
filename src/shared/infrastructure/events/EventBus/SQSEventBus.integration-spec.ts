import { juniorXpId } from '../../../../../test/mother/TalkMother/JuniorXp'
import { waitFor } from '../../../../../test/utils/waitFor'
import { TalkProposed } from '../../../../talks/domain/events/TalkProposed'
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber'
import { config } from '../../config'
import { SQSConnection } from '../../queue/SQSConnection'
import { DomainEventMapperFake } from '../DomainEventMapper/DomainEventMapperFake'
import { SQSEventBus } from './SQSEventBus'

describe(SQSEventBus, () => {
  let connection: SQSConnection
  let eventBus: SQSEventBus
  let userCreatedSubscriber: DomainEventSubscriberFake

  beforeEach(async () => {
    connection = new SQSConnection(
      config.aws.accessKey,
      config.aws.secretAccessKey,
      config.aws.region
    )
    await connection.connect()
    userCreatedSubscriber = new DomainEventSubscriberFake()
    const domainEventMapper = new DomainEventMapperFake(userCreatedSubscriber)
    eventBus = new SQSEventBus(connection, config.queue.sqs.queueUrl, domainEventMapper)
    await eventBus.onModuleInit()
  })

  afterEach(async () => {
    await eventBus.onModuleDestroy()
    await connection.close()
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
