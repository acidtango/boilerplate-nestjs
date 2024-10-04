import { createRoute, OpenAPIHono, type RouteConfig } from '@hono/zod-openapi'
import { RegisterSpeaker } from '../../use-cases/RegisterSpeaker.ts'
import { RegisterSpeakerRequestDTO } from './dtos/RegisterSpeakerRequestDTO.ts'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress.ts'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId.ts'
import { PlainPassword } from '../../../shared/domain/models/PlainPassword.ts'

const schema = {
  method: 'post',
  path: '/api/v1/speakers/registration',
  tags: ['speakers'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterSpeakerRequestDTO,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Speaker registered',
    },
  },
} satisfies RouteConfig

export function registerSpeakerEndpoint(api: OpenAPIHono) {
  api.openapi(createRoute(schema), async (c) => {
    const registerSpeaker = await c.var.container.getAsync(RegisterSpeaker)

    const body = c.req.valid('json')
    await registerSpeaker.execute({
      id: SpeakerId.fromPrimitives(body.id),
      email: EmailAddress.fromPrimitives(body.email),
      password: PlainPassword.fromPrimitives(body.password),
    })
    return c.body(null, 201)
  })
}
