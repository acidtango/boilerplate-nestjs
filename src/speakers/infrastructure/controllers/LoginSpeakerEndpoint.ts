import { createRoute, OpenAPIHono, type RouteConfig } from '@hono/zod-openapi'
import type { interfaces } from 'inversify'
import type { HonoController } from '../../../shared/infrastructure/HonoController.ts'
import { LoginSpeakerRequestDTO } from './dtos/LoginSpeakerRequestDTO.ts'
import { LoginSpeakerResponseDTO } from './dtos/LoginSpeakerResponseDTO.ts'
import { LoginSpeaker } from '../../use-cases/LoginSpeaker.ts'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress.ts'
import { PlainPassword } from '../../../shared/domain/models/PlainPassword.ts'

export class LoginSpeakerEndpoint implements HonoController {
  private static Schema = {
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

  public static async create({ container }: interfaces.Context) {
    return new LoginSpeakerEndpoint(await container.getAsync(LoginSpeaker))
  }

  private readonly loginSpeaker: LoginSpeaker

  constructor(loginSpeaker: LoginSpeaker) {
    this.loginSpeaker = loginSpeaker
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(LoginSpeakerEndpoint.Schema), async (c) => {
      const body = c.req.valid('json')
      const email = EmailAddress.fromPrimitives(body.email)
      const password = PlainPassword.fromPrimitives(body.password)

      const accessToken = await this.loginSpeaker.execute({ email, password })

      return c.json({ accessToken }, 200)
    })
  }
}
