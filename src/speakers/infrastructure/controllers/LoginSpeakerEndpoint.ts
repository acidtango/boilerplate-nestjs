import { createRoute, OpenAPIHono, type RouteConfig } from '@hono/zod-openapi'
import { LoginSpeakerRequestDTO } from './dtos/LoginSpeakerRequestDTO.ts'
import { LoginSpeakerResponseDTO } from './dtos/LoginSpeakerResponseDTO.ts'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress.ts'
import { PlainPassword } from '../../../shared/domain/models/PlainPassword.ts'
import { LoginSpeaker } from '../../use-cases/LoginSpeaker.ts'

const schema = {
  method: 'post',
  path: '/api/v1/speakers/login',
  description: 'Login a speaker to get the auth tokens',
  tags: ['speakers'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginSpeakerRequestDTO,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Speaker registered',
      content: {
        'application/json': {
          schema: LoginSpeakerResponseDTO,
        },
      },
    },
  },
} satisfies RouteConfig

export function loginSpeakerEndpoint(api: OpenAPIHono) {
  api.openapi(createRoute(schema), async (c) => {
    const loginSpeaker = await c.var.container.getAsync(LoginSpeaker)
    const body = c.req.valid('json')
    const email = EmailAddress.fromPrimitives(body.email)
    const password = PlainPassword.fromPrimitives(body.password)

    const accessToken = await loginSpeaker.execute({ email, password })

    return c.json({ accessToken }, 200)
  })
}
