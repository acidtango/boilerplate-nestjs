import { OpenAPIHono } from '@hono/zod-openapi'
import { BindingScopeEnum, Container } from 'inversify'
import { RegisterSpeaker } from './speakers/use-cases/RegisterSpeaker.ts'
import { RegisterSpeakerController } from './speakers/infrastructure/controllers/RegisterSpeakerController.ts'
import type { HonoController } from './shared/infrastructure/HonoController.ts'
import { ClockFake } from './shared/infrastructure/services/clock/ClockFake.ts'
import { LoginSpeakerController } from './speakers/infrastructure/controllers/LoginSpeakerController.ts'
import { Token } from './shared/domain/services/Token.ts'
import { SpeakerRepositoryMemory } from './speakers/infrastructure/repositories/SpeakerRepositoryMemory.ts'
import { CryptoNode } from './shared/infrastructure/services/crypto/CryptoNode.ts'
import { EventBusMemory } from './shared/infrastructure/events/EventBus/EventBusMemory.ts'
import { LoginSpeaker } from './speakers/use-cases/LoginSpeaker.ts'
import { UpdateSpeakerProfileController } from './speakers/infrastructure/controllers/UpdateSpeakerProfileController.ts'
import { UpdateSpeakerProfile } from './speakers/use-cases/UpdateSpeakerProfile.ts'
import { GetSpeakerController } from './speakers/infrastructure/controllers/GetSpeakerController.ts'
import { GetSpeaker } from './speakers/use-cases/GetSpeaker.ts'

export const container = new Container({
  defaultScope: BindingScopeEnum.Singleton,
})

// Use Cases
container.bind(RegisterSpeaker).toDynamicValue(RegisterSpeaker.create)
container.bind(LoginSpeaker).toDynamicValue(LoginSpeaker.create)
container.bind(UpdateSpeakerProfile).toDynamicValue(UpdateSpeakerProfile.create)
container.bind(GetSpeaker).toDynamicValue(GetSpeaker.create)

// Repositories
container.bind(Token.SPEAKER_REPOSITORY).toConstantValue(new SpeakerRepositoryMemory())

// Services
container.bind(Token.CRYPTO).toConstantValue(new CryptoNode())
container.bind(Token.CLOCK).toConstantValue(new ClockFake())
container.bind(Token.EVENT_BUS).toConstantValue(new EventBusMemory())

// Controllers
container.bind(Token.CONTROLLER).toDynamicValue(RegisterSpeakerController.create)
container.bind(Token.CONTROLLER).toDynamicValue(LoginSpeakerController.create)
container.bind(Token.CONTROLLER).toDynamicValue(UpdateSpeakerProfileController.create)
container.bind(Token.CONTROLLER).toDynamicValue(GetSpeakerController.create)

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
