import type { interfaces } from 'inversify'
import { OpenAPIHono } from '@hono/zod-openapi'
import { containerMiddleware } from './ContainerMiddleware.ts'
import { getSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/GetSpeakerEndpoint.ts'
import { loginSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/LoginSpeakerEndpoint.ts'
import { registerSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/RegisterSpeakerEndpoint.ts'
import { updateSpeakerProfileEndpoint } from '../../../speakers/infrastructure/controllers/UpdateSpeakerProfileEndpoint.ts'
import { createEventEndpoint } from '../../../events/infrastructure/controllers/CreateEventEndpoint.ts'
import { listEvents } from '../../../events/infrastructure/controllers/ListEventsEndpoint.ts'

declare module 'hono' {
  interface ContextVariableMap {
    container: interfaces.Container
  }
}

export function createHono({ container }: interfaces.Context) {
  const app = new OpenAPIHono()

  app.use(containerMiddleware(container))

  getSpeakerEndpoint(app)
  loginSpeakerEndpoint(app)
  registerSpeakerEndpoint(app)
  updateSpeakerProfileEndpoint(app)
  createEventEndpoint(app)
  listEvents(app)

  return app
}
