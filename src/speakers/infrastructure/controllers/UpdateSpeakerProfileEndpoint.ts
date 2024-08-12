import { createRoute, OpenAPIHono, type RouteConfig, z } from '@hono/zod-openapi'
import type { HonoController } from '../../../shared/infrastructure/HonoController.ts'
import type { interfaces } from 'inversify'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId.ts'
import { UpdateSpeakerProfile } from '../../use-cases/UpdateSpeakerProfile.ts'
import { SpeakerProfileDTO } from './dtos/SpeakerProfileDTO.ts'
import { SpeakerName } from '../../domain/models/SpeakerName.ts'
import { SpeakerAge } from '../../domain/models/SpeakerAge.ts'
import { CONCHA_ASENSIO } from '../../../shared/infrastructure/fixtures/speakers.ts'

const ParamsSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: CONCHA_ASENSIO.id,
    }),
})

export class UpdateSpeakerProfileEndpoint implements HonoController {
  private static Schema = {
    method: 'put',
    path: '/api/v1/speakers/:id/profile',
    request: {
      params: ParamsSchema,
      body: {
        content: {
          'application/json': {
            schema: SpeakerProfileDTO,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Speaker profile updated',
      },
    },
  } satisfies RouteConfig

  public static create({ container }: interfaces.Context) {
    return new UpdateSpeakerProfileEndpoint(container.get(UpdateSpeakerProfile))
  }

  private readonly updateSpeakerProfile: UpdateSpeakerProfile

  constructor(registerSpeaker: UpdateSpeakerProfile) {
    this.updateSpeakerProfile = registerSpeaker
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(UpdateSpeakerProfileEndpoint.Schema), async (c) => {
      const body = c.req.valid('json')
      const param = c.req.valid('param')
      await this.updateSpeakerProfile.execute({
        id: SpeakerId.fromPrimitives(param.id),
        name: SpeakerName.fromPrimitives(body.name),
        age: SpeakerAge.fromPrimitives(body.age),
        language: body.language,
      })
      return c.body(null, 200)
    })
  }
}
