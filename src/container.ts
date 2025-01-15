import { MongoClient } from 'mongodb'
import { BindingScopeEnum, Container } from 'inversify'
import { RegisterSpeaker } from './speakers/use-cases/RegisterSpeaker.ts'
import { ClockFake } from './shared/infrastructure/services/clock/ClockFake.ts'
import { Token } from './shared/domain/services/Token.ts'
import { SpeakerRepositoryMemory } from './speakers/infrastructure/repositories/SpeakerRepositoryMemory.ts'
import { CryptoNode } from './shared/infrastructure/services/crypto/CryptoNode.ts'
import { EventBusMemory } from './shared/infrastructure/events/EventBus/EventBusMemory.ts'
import { LoginSpeaker } from './speakers/use-cases/LoginSpeaker.ts'
import { UpdateSpeakerProfile } from './speakers/use-cases/UpdateSpeakerProfile.ts'
import { GetSpeaker } from './speakers/use-cases/GetSpeaker.ts'
import { CreateEvent } from './events/use-cases/CreateEvent.ts'
import { ListEvents } from './events/use-cases/ListEvents.ts'
import { createMongoClient } from './shared/infrastructure/repositories/CreateMongoClient.ts'
import { createHono } from './shared/infrastructure/controllers/CreateHono.ts'
import { EventRepositoryMemory } from './events/infrastructure/repositories/EventRepositoryMemory.ts'
import { TalkRepositoryMemory } from './talks/infrastructure/repositories/TalkRepositoryMemory.ts'
import { ProposeTalk } from './talks/use-cases/ProposeTalk.ts'
import { GetTalk } from './talks/use-cases/GetTalk.ts'
import { EmailSenderFake } from '../test/fakes/EmailSenderFake.ts'
import { DomainEventMapperFake } from './shared/infrastructure/events/DomainEventMapper/DomainEventMapperFake.ts'
import { TalkProposedSubscriber } from './talks/use-cases/subscribers/TalkProposedSubscriber.ts'
import { ReviewTalk } from './talks/use-cases/ReviewTalk.ts'
import { ApproveTalk } from './talks/use-cases/ApproveTalk.js'
import { CreateEventEndpoint } from './events/infrastructure/controllers/CreateEventEndpoint.js'
import { ListEventsEndpoint } from './events/infrastructure/controllers/ListEventsEndpoint.js'
import { RegisterSpeakerEndpoint } from './speakers/infrastructure/controllers/RegisterSpeakerEndpoint.js'
import { LoginSpeakerEndpoint } from './speakers/infrastructure/controllers/LoginSpeakerEndpoint.js'
import { UpdateSpeakerProfileEndpoint } from './speakers/infrastructure/controllers/UpdateSpeakerProfileEndpoint.js'
import { GetSpeakerEndpoint } from './speakers/infrastructure/controllers/GetSpeakerEndpoint.js'
import { ProposeTalkEndpoint } from './talks/infrastructure/controllers/ProposeTalkEndpoint.js'
import { GetTalkEndpoint } from './talks/infrastructure/controllers/GetTalkEndpoint.js'
import { ReviewTalkEndpoint } from './talks/infrastructure/controllers/ReviewTalkEndpoint.js'
import { ApproveTalkEndpoint } from './talks/infrastructure/controllers/ApproveTalkEndpoint.js'

export const container = new Container({ defaultScope: BindingScopeEnum.Singleton })

// Use Cases
container.bind(RegisterSpeaker).toDynamicValue(RegisterSpeaker.create)
container.bind(LoginSpeaker).toDynamicValue(LoginSpeaker.create)
container.bind(UpdateSpeakerProfile).toDynamicValue(UpdateSpeakerProfile.create)
container.bind(GetSpeaker).toDynamicValue(GetSpeaker.create)

container.bind(CreateEvent).toDynamicValue(CreateEvent.create)
container.bind(ListEvents).toDynamicValue(ListEvents.create)

container.bind(ProposeTalk).toDynamicValue(ProposeTalk.create)
container.bind(GetTalk).toDynamicValue(GetTalk.create)
container.bind(ReviewTalk).toDynamicValue(ReviewTalk.create)
container.bind(ApproveTalk).toDynamicValue(ApproveTalk.create)

// Controllers
container.bind(Token.ENDPOINT).toConstantValue(CreateEventEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(ListEventsEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(RegisterSpeakerEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(LoginSpeakerEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(UpdateSpeakerProfileEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(GetSpeakerEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(ProposeTalkEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(GetTalkEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(ReviewTalkEndpoint)
container.bind(Token.ENDPOINT).toConstantValue(ApproveTalkEndpoint)

// Subscribers
container.bind(TalkProposedSubscriber).toDynamicValue(TalkProposedSubscriber.create)

// Repositories
container.bind(Token.SPEAKER_REPOSITORY).toConstantValue(new SpeakerRepositoryMemory())
container.bind(Token.EVENT_REPOSITORY).toConstantValue(new EventRepositoryMemory())
container.bind(Token.TALK_REPOSITORY).toConstantValue(new TalkRepositoryMemory())

// Services
container.bind(Token.CRYPTO).toConstantValue(new CryptoNode())
container.bind(Token.CLOCK).toConstantValue(new ClockFake())
container.bind(Token.EVENT_BUS).toDynamicValue(EventBusMemory.create)
container.bind(Token.EMAIL_SENDER).toConstantValue(new EmailSenderFake())
container.bind(Token.DOMAIN_EVENT_MAPPER).toDynamicValue(DomainEventMapperFake.create)

// Libraries
container.bind(MongoClient).toDynamicValue(createMongoClient)

// Hono
container.bind(Token.APP).toDynamicValue(createHono)
