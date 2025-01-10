import type { interfaces } from 'inversify'
import { Hono } from 'hono'

import { containerMiddleware } from './ContainerMiddleware.ts'
import { CreateEventEndpoint } from '../../../events/infrastructure/controllers/CreateEventEndpoint.ts'
import { ListEventsEndpoint } from '../../../events/infrastructure/controllers/ListEventsEndpoint.js'
import { RegisterSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/RegisterSpeakerEndpoint.js'
import { LoginSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/LoginSpeakerEndpoint.js'
import { UpdateSpeakerProfileEndpoint } from '../../../speakers/infrastructure/controllers/UpdateSpeakerProfileEndpoint.js'
import { GetSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/GetSpeakerEndpoint.js'

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
  app[ListEventsEndpoint.method](ListEventsEndpoint.path, ...ListEventsEndpoint.handlers)
  app[RegisterSpeakerEndpoint.method](
    RegisterSpeakerEndpoint.path,
    ...RegisterSpeakerEndpoint.handlers
  )
  app[LoginSpeakerEndpoint.method](LoginSpeakerEndpoint.path, ...LoginSpeakerEndpoint.handlers)
  app[UpdateSpeakerProfileEndpoint.method](
    UpdateSpeakerProfileEndpoint.path,
    ...UpdateSpeakerProfileEndpoint.handlers
  )
  app[GetSpeakerEndpoint.method](GetSpeakerEndpoint.path, ...GetSpeakerEndpoint.handlers)
  // listEvents(app)

  return app
}
