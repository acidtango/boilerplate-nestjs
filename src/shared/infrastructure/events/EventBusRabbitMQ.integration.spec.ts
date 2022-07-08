import { EventBusRabbitMQ } from './EventBusRabbitMQ'
import { DomainEventMapperFake } from './DomainEventMapperFake'
import { WelcomeEmailSender } from '../../../application/users/use-cases/subscribers/WelcomeEmailSender'
import { UserId } from '../../domain/ids/UserId'
import { MICHAEL } from '../../fixtures/users'
import { waitFor } from '../../../utils/waitFor'
import { User } from '../../../application/users/domain/User'
import { DomainId } from '../../domain/hex/DomainId'
import { describeThirdParty } from '../../../../test/utils/describeThirdParty'
import { SMSClientFake } from '../services/sms-client/SMSClientFake'

describeThirdParty('EventBusRabbitMQ', () => {
  it('sends the event and calls the given subscriber', async () => {
    const smsClient = new SMSClientFake()
    const userCreatedSubscriber = new WelcomeEmailSender(smsClient)
    jest.spyOn(userCreatedSubscriber, 'on')
    const domainEventMapper = new DomainEventMapperFake(userCreatedSubscriber)
    const eventBus = new EventBusRabbitMQ(domainEventMapper)
    await eventBus.onApplicationBootstrap()
    const user = User.create({
      userId: UserId.fromPrimitives(MICHAEL.uuid),
      name: MICHAEL.name,
      lastName: MICHAEL.lastName,
      phone: MICHAEL.phone,
    })
    const adminId = new DomainId('78a455c6-7353-4aaf-9b46-892e2f0f694b')

    await eventBus.publishEventsOf({ aggregateRoot: user, executorId: adminId })

    await waitFor(async () => {
      expect(userCreatedSubscriber.on).toHaveBeenCalled()
    })

    await eventBus.onApplicationShutdown()
  })
})
