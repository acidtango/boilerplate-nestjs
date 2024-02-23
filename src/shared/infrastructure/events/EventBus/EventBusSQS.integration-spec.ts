import { juniorXpId } from '../../../../../test/mother/TalkMother/JuniorXp'
import { waitFor } from '../../../../../test/utils/waitFor'
import { TalkProposed } from '../../../../talks/domain/events/TalkProposed'
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber'
import { DomainEventMapperFake } from '../DomainEventMapper/DomainEventMapperFake'
import { EventBusSQS } from './EventBusSQS'

describe('EventBusSQS', () => {
  let eventBus: EventBusSQS
  let domainEventSubscriber: DomainEventSubscriberFake

  beforeEach(async () => {
    domainEventSubscriber = new DomainEventSubscriberFake()
    const domainEventMapper = new DomainEventMapperFake(domainEventSubscriber)
    eventBus = new EventBusSQS(domainEventMapper)
    await eventBus.createQueue()
    await eventBus.onModuleInit()
  })

  afterEach(async () => {
    await eventBus.destroyQueue()
  })

  afterAll(async () => {
    await eventBus.onModuleDestroy()
  })

  it('sends the event and calls the given subscriber', async () => {
    const event = TalkProposed.emit(juniorXpId())

    await eventBus.publish([event])

    await waitFor(async () => {
      domainEventSubscriber.expectToHaveReceivedEvent(event)
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
