import { EventBusRabbitMQ } from './EventBusRabbitMQ'
import { DomainEventMapperFake } from './DomainEventMapperFake'
import { UserCreatedSubscriber } from '../../../application/users/domain/events/UserCreatedSubscriber'
import { UserCreated } from '../../../application/users/domain/events/UserCreated'
import { UserId } from '../../domain/ids/UserId'
import { MICHAEL } from '../../fixtures/users'
import { UuidGeneratorDeterministic } from '../services/uuid-generator/UuidGeneratorDeterministic'
import { sleep } from '../../../utils/sleep'

describe('EventBusRabbitMQ', () => {
  it('sends the event and calls the given subscriber', async () => {
    const userCreatedSubscriber = new UserCreatedSubscriber()
    jest.spyOn(userCreatedSubscriber, 'on')
    const domainEventMapper = new DomainEventMapperFake(userCreatedSubscriber)
    const eventBus = new EventBusRabbitMQ(domainEventMapper)
    await eventBus.onApplicationBootstrap()
    const userCreated = new UserCreated(
      new UserId(UuidGeneratorDeterministic.uuidFor(0)),
      MICHAEL.name,
      MICHAEL.lastName,
      MICHAEL.phone
    )

    await eventBus.publish([userCreated])
    await sleep(1000)

    expect(userCreatedSubscriber.on).toHaveBeenCalled()
  })
})
