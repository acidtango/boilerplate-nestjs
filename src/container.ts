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
import { EmailSenderFake } from '../test/fakes/EmailSenderFake.js'
import { DomainEventMapperFake } from './shared/infrastructure/events/DomainEventMapper/DomainEventMapperFake.js'
import { TalkProposedSubscriber } from './talks/use-cases/subscribers/TalkProposedSubscriber.js'

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
