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
import { MongoClient } from 'mongodb'
import { EventRepositoryMongo } from './events/infrastructure/repositories/EventRepositoryMongo.ts'
import { createMongoClient } from './shared/infrastructure/repositories/CreateMongoClient.ts'
import { createHono } from './shared/infrastructure/controllers/CreateHono.ts'

export const container = new Container({ defaultScope: BindingScopeEnum.Singleton })

// Use Cases
container.bind(RegisterSpeaker).toDynamicValue(RegisterSpeaker.create)
container.bind(LoginSpeaker).toDynamicValue(LoginSpeaker.create)
container.bind(UpdateSpeakerProfile).toDynamicValue(UpdateSpeakerProfile.create)
container.bind(GetSpeaker).toDynamicValue(GetSpeaker.create)
container.bind(CreateEvent).toDynamicValue(CreateEvent.create)
container.bind(ListEvents).toDynamicValue(ListEvents.create)

// Repositories
container.bind(Token.SPEAKER_REPOSITORY).toConstantValue(new SpeakerRepositoryMemory())
container.bind(Token.EVENT_REPOSITORY).toDynamicValue(EventRepositoryMongo.create)

// Services
container.bind(Token.CRYPTO).toConstantValue(new CryptoNode())
container.bind(Token.CLOCK).toConstantValue(new ClockFake())
container.bind(Token.EVENT_BUS).toConstantValue(new EventBusMemory())

// Libraries
container.bind(MongoClient).toDynamicValue(createMongoClient)

// Hono
container.bind(Token.APP).toDynamicValue(createHono)
