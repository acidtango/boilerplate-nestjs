import { describeRoute } from 'hono-openapi'
import { TalkResponseDTO } from './dtos/TalkResponseDTO.ts'
import { factory } from '../../../shared/infrastructure/controllers/factory.js'
import { resolver, validator } from 'hono-openapi/zod'
import { z } from '../../../shared/infrastructure/controllers/zod.js'
import { JUNIOR_XP } from '../../../shared/infrastructure/fixtures/talks.js'
import { GetTalk } from '../../use-cases/GetTalk.js'
import { TalkId } from '../../../shared/domain/models/ids/TalkId.js'

const ParamsSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: JUNIOR_XP.id,
    }),
})

export const GetTalkEndpoint = {
  method: 'get' as const,
  path: '/api/v1/talks/:id',
  handlers: factory.createHandlers(
    describeRoute({
      description: 'Get a talk by id',
      tags: ['Talks'],
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: resolver(TalkResponseDTO),
            },
          },
        },
      },
    }),
    validator('param', ParamsSchema),
    async (c) => {
      const getTalk = await c.var.container.getAsync(GetTalk)
      const param = c.req.valid('param')

      const talk = await getTalk.execute(new TalkId(param.id))

      const talkPrimitives = talk.toPrimitives()

      return c.json(talkPrimitives)
    }
  ),
}
