import { OpenAPIHono } from '@hono/zod-openapi'
import { BindingScopeEnum, Container } from 'inversify'
import { RegisterSpeaker } from './speakers/use-cases/RegisterSpeaker.ts'
import { RegisterSpeakerEndpoint } from './speakers/infrastructure/controllers/RegisterSpeakerEndpoint.ts'
import type { HonoController } from './shared/infrastructure/HonoController.ts'
import { ClockFake } from './shared/infrastructure/services/clock/ClockFake.ts'
import { LoginSpeakerEndpoint } from './speakers/infrastructure/controllers/LoginSpeakerEndpoint.ts'
import { Token } from './shared/domain/services/Token.ts'
import { SpeakerRepositoryMemory } from './speakers/infrastructure/repositories/SpeakerRepositoryMemory.ts'
import { CryptoNode } from './shared/infrastructure/services/crypto/CryptoNode.ts'
import { EventBusMemory } from './shared/infrastructure/events/EventBus/EventBusMemory.ts'
import { LoginSpeaker } from './speakers/use-cases/LoginSpeaker.ts'
import { UpdateSpeakerProfileEndpoint } from './speakers/infrastructure/controllers/UpdateSpeakerProfileEndpoint.ts'
import { UpdateSpeakerProfile } from './speakers/use-cases/UpdateSpeakerProfile.ts'
import { GetSpeakerEndpoint } from './speakers/infrastructure/controllers/GetSpeakerEndpoint.ts'
import { GetSpeaker } from './speakers/use-cases/GetSpeaker.ts'
import { CreateEventController } from './events/infrastructure/controllers/CreateEventEndpoint.ts'
import { CreateEvent } from './events/use-cases/CreateEvent.ts'
import { EventRepositoryMemory } from './events/infrastructure/repositories/EventRepositoryMemory.ts'
import { ListEventsEndpoint } from './events/infrastructure/controllers/ListEventsEndpoint.ts'
import { ListEvents } from './events/use-cases/ListEvents.ts'

export const container = new Container({
  defaultScope: BindingScopeEnum.Singleton,
})

// Use Cases
container.bind(RegisterSpeaker).toDynamicValue(RegisterSpeaker.create)
container.bind(LoginSpeaker).toDynamicValue(LoginSpeaker.create)
container.bind(UpdateSpeakerProfile).toDynamicValue(UpdateSpeakerProfile.create)
container.bind(GetSpeaker).toDynamicValue(GetSpeaker.create)
container.bind(CreateEvent).toDynamicValue(CreateEvent.create)
container.bind(ListEvents).toDynamicValue(ListEvents.create)

// Repositories
container.bind(Token.SPEAKER_REPOSITORY).toConstantValue(new SpeakerRepositoryMemory())
container.bind(Token.EVENT_REPOSITORY).toConstantValue(new EventRepositoryMemory())

// Services
container.bind(Token.CRYPTO).toConstantValue(new CryptoNode())
container.bind(Token.CLOCK).toConstantValue(new ClockFake())
container.bind(Token.EVENT_BUS).toConstantValue(new EventBusMemory())

// Controllers
container.bind(Token.CONTROLLER).toDynamicValue(RegisterSpeakerEndpoint.create)
container.bind(Token.CONTROLLER).toDynamicValue(LoginSpeakerEndpoint.create)
container.bind(Token.CONTROLLER).toDynamicValue(UpdateSpeakerProfileEndpoint.create)
container.bind(Token.CONTROLLER).toDynamicValue(GetSpeakerEndpoint.create)
container.bind(Token.CONTROLLER).toDynamicValue(CreateEventController.create)
container.bind(Token.CONTROLLER).toDynamicValue(ListEventsEndpoint.create)

// Hono
container.bind(Token.HONO).toConstantValue(new OpenAPIHono())
container.bind(Token.APP).toDynamicValue((context) => {
  const api = context.container.get<OpenAPIHono>(Token.HONO)
  const controllers = context.container.getAll<HonoController>(Token.CONTROLLER)

  for (const controller of controllers) {
    controller.register(api)
  }

  return api
})
