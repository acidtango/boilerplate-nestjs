import { createRoute, OpenAPIHono, type RouteConfig, z } from '@hono/zod-openapi'
import type { interfaces } from 'inversify'
import type { HonoController } from '../../../shared/infrastructure/HonoController.ts'
import { GetSpeaker } from '../../use-cases/GetSpeaker.ts'
import { SpeakerResponseDTO } from './dtos/SpeakerResponseDTO.ts'
import { CONCHA_ASENSIO } from '../../../shared/infrastructure/fixtures/speakers.ts'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId.ts'
import type { SpeakerProfilePrimitives } from '../../domain/models/SpeakerProfile.ts'
import { SpeakerProfileDTO } from './dtos/SpeakerProfileDTO.ts'

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

export class GetSpeakerEndpoint implements HonoController {
  private static Schema = {
    method: 'get',
    path: '/api/v1/speakers/:id',
    tags: ['speakers'],
    request: {
      params: ParamsSchema,
    },
    responses: {
      200: {
        description: 'Speaker registered',
        content: {
          'application/json': {
            schema: SpeakerResponseDTO,
          },
        },
      },
    },
  } satisfies RouteConfig

  public static async create({ container }: interfaces.Context) {
    return new GetSpeakerEndpoint(await container.getAsync(GetSpeaker))
  }

  private readonly getSpeaker: GetSpeaker

  constructor(loginSpeaker: GetSpeaker) {
    this.getSpeaker = loginSpeaker
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(GetSpeakerEndpoint.Schema), async (c) => {
      const param = c.req.valid('param')
      const speaker = await this.getSpeaker.execute(SpeakerId.fromPrimitives(param.id))

      const speakerPrimitives = speaker.toPrimitives()

      return c.json(
        {
          id: speakerPrimitives.id,
          email: speakerPrimitives.email,
          isEmailValidated: speakerPrimitives.isEmailValidated,
          profile: this.mapProfileToDTO(speakerPrimitives.profile),
        },
        200
      )
    })
  }

  private mapProfileToDTO(
    profilePrimitives?: SpeakerProfilePrimitives
  ): SpeakerProfileDTO | undefined {
    if (!profilePrimitives) {
      return undefined
    }

    return {
      name: profilePrimitives.name,
      age: profilePrimitives.age,
      language: profilePrimitives.language,
    }
  }
}
