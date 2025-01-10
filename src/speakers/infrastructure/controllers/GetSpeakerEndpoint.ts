import { createRoute, OpenAPIHono, type RouteConfig, z } from '@hono/zod-openapi'
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

const schema = {
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

export function getSpeakerEndpoint(api: OpenAPIHono) {
  const route = createRoute(schema)

  type Foo = typeof route

  api.openapi(route, async (c) => {
    const getSpeaker = await c.var.container.getAsync(GetSpeaker)
    const param = c.req.valid('param')
    const speaker = await getSpeaker.execute(SpeakerId.fromPrimitives(param.id))

    const speakerPrimitives = speaker.toPrimitives()

    return c.json(
      {
        id: speakerPrimitives.id,
        email: speakerPrimitives.email,
        isEmailValidated: 3,
        profile: mapProfileToDTO(speakerPrimitives.profile),
      },
      200
    )
  })
}

function mapProfileToDTO(
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
