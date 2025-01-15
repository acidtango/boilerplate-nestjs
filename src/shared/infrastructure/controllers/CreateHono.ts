import type { interfaces } from 'inversify'
import { Hono } from 'hono'

import { containerMiddleware } from './ContainerMiddleware.ts'
import { CreateEventEndpoint } from '../../../events/infrastructure/controllers/CreateEventEndpoint.ts'
import { ListEventsEndpoint } from '../../../events/infrastructure/controllers/ListEventsEndpoint.ts'
import { RegisterSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/RegisterSpeakerEndpoint.ts'
import { LoginSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/LoginSpeakerEndpoint.ts'
import { UpdateSpeakerProfileEndpoint } from '../../../speakers/infrastructure/controllers/UpdateSpeakerProfileEndpoint.ts'
import { GetSpeakerEndpoint } from '../../../speakers/infrastructure/controllers/GetSpeakerEndpoint.ts'
import { ProposeTalkEndpoint } from '../../../talks/infrastructure/controllers/ProposeTalkEndpoint.ts'
import { GetTalkEndpoint } from '../../../talks/infrastructure/controllers/GetTalkEndpoint.ts'
import { ReviewTalkEndpoint } from '../../../talks/infrastructure/controllers/ReviewTalkEndpoint.ts'

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
  app[ProposeTalkEndpoint.method](ProposeTalkEndpoint.path, ...ProposeTalkEndpoint.handlers)
  app[GetTalkEndpoint.method](GetTalkEndpoint.path, ...GetTalkEndpoint.handlers)
  app[ReviewTalkEndpoint.method](ReviewTalkEndpoint.path, ...ReviewTalkEndpoint.handlers)
  // listEvents(app)

  return app
}
