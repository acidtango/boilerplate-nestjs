import type { interfaces } from 'inversify'
import { Hono } from 'hono'

import { containerMiddleware } from './ContainerMiddleware.ts'
import { CreateEventEndpoint } from '../../../events/infrastructure/controllers/CreateEventEndpoint.ts'

declare module 'hono' {
  interface ContextVariableMap {
    container: interfaces.Container
  }
}

export function createHono({ container }: interfaces.Context) {
  const app = new Hono()
  app.use(containerMiddleware(container))

  // getSpeakerEndpoint(app)
  // loginSpeakerEndpoint(app)
  // registerSpeakerEndpoint(app)
  // updateSpeakerProfileEndpoint(app)
  app[CreateEventEndpoint.method](CreateEventEndpoint.path, ...CreateEventEndpoint.handlers)
  // listEvents(app)

  return app
}
