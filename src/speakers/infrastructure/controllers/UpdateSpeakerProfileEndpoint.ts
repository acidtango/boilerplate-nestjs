import { createRoute, OpenAPIHono, type RouteConfig, z } from '@hono/zod-openapi'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId.ts'
import { SpeakerProfileDTO } from './dtos/SpeakerProfileDTO.ts'
import { SpeakerName } from '../../domain/models/SpeakerName.ts'
import { SpeakerAge } from '../../domain/models/SpeakerAge.ts'
import { CONCHA_ASENSIO } from '../../../shared/infrastructure/fixtures/speakers.ts'
import { UpdateSpeakerProfile } from '../../use-cases/UpdateSpeakerProfile.ts'

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
  method: 'put',
  path: '/api/v1/speakers/:id/profile',
  tags: ['speakers'],
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

export function updateSpeakerProfileEndpoint(api: OpenAPIHono) {
  api.openapi(createRoute(schema), async (c) => {
    const updateSpeakerProfile = await c.var.container.getAsync(UpdateSpeakerProfile)
    const body = c.req.valid('json')
    const param = c.req.valid('param')
    await updateSpeakerProfile.execute({
      id: SpeakerId.fromPrimitives(param.id),
      name: SpeakerName.fromPrimitives(body.name),
      age: SpeakerAge.fromPrimitives(body.age),
      language: body.language,
    })
    return c.body(null, 200)
  })
}
