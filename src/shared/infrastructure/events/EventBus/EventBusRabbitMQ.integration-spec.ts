import { EventBusRabbitMQ } from './EventBusRabbitMQ'
import { DomainEventMapperFake } from '../DomainEventMapper/DomainEventMapperFake'
import { TalkProposedSubscriber } from '../../../../talks/use-cases/subscribers/TalkProposedSubscriber'
import { TalkProposed } from '../../../../talks/domain/events/TalkProposed'
import { juniorXpId } from '../../../../../test/mother/TalkMother/JuniorXp'
import { waitFor } from '../../../../../test/utils/waitFor'
import { EmailSenderFake } from '../../../../../test/fakes/EmailSenderFake'
import { TalkRepositoryFake } from '../../../../../test/fakes/TalkRepositoryFake'
import { SpeakerRepositoryFake } from '../../../../../test/fakes/SpeakerRepositoryFake'
import { RabbitMQModule } from '../../queue/RabbitMQModule'

describe('EventBusRabbitMQ', () => {
  it('sends the event and calls the given subscriber', async () => {
    await withConnection(async (connection) => {
      const emailSender = new EmailSenderFake()
      const talkRepository = TalkRepositoryFake.createWithJuniorXp()
      const speakerRepository = SpeakerRepositoryFake.createWithConcha()
      const userCreatedSubscriber = new TalkProposedSubscriber(
        emailSender,
        talkRepository,
        speakerRepository
      )
      jest.spyOn(userCreatedSubscriber, 'on')
      const domainEventMapper = new DomainEventMapperFake(userCreatedSubscriber)
      const eventBus = new EventBusRabbitMQ(connection, domainEventMapper)
      await eventBus.onModuleInit()

      await eventBus.publish([new TalkProposed(juniorXpId())])

      await waitFor(async () => {
        expect(userCreatedSubscriber.on).toHaveBeenCalled()
      })
    })
  })
})

async function withConnection(cb: (connection: any) => Promise<void>) {
  const connection = RabbitMQModule.createRabbitMQConnection()

  try {
    await connection.completeConfiguration()
    await cb(connection)
  } finally {
    await connection.close()
  }
}
