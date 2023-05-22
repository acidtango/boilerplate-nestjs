import { EventBusRabbitMQ } from './EventBusRabbitMQ'
import { DomainEventMapperFake } from '../DomainEventMapper/DomainEventMapperFake'
import { TalkProposed } from '../../../../talks/domain/events/TalkProposed'
import { juniorXpId } from '../../../../../test/mother/TalkMother/JuniorXp'
import { waitFor } from '../../../../../test/utils/waitFor'
import { RabbitMQModule } from '../../queue/RabbitMQModule'
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber'
import { RabbitConnection } from '../../queue/RabbitConnection'

describe('EventBusRabbitMQ', () => {
  let connection: RabbitConnection
  let eventBus: EventBusRabbitMQ
  let userCreatedSubscriber: DomainEventSubscriberFake

  beforeEach(async () => {
    connection = RabbitMQModule.createRabbitMQConnection()
    await connection.connect()
    userCreatedSubscriber = new DomainEventSubscriberFake()
    const domainEventMapper = new DomainEventMapperFake(userCreatedSubscriber)
    eventBus = new EventBusRabbitMQ(connection, domainEventMapper)
    await eventBus.onModuleInit()
  })

  afterEach(async () => {
    await connection.close()
  })

  it('sends the event and calls the given subscriber', async () => {
    const event = new TalkProposed(juniorXpId())

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
