import { describeRoute } from 'hono-openapi'
import { TalkResponseDTO } from './dtos/TalkResponseDTO.ts'
import { factory } from '../../../shared/infrastructure/controllers/factory.js'
import { resolver, validator } from 'hono-openapi/zod'
import { z } from '../../../shared/infrastructure/controllers/zod.js'
import { JUNIOR_XP } from '../../../shared/infrastructure/fixtures/talks.js'

/*
@Controller('/v1/talks/:id')
export class GetTalkEndpoint {
  constructor(private readonly getTalk: GetTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Get talk by id',
    status: HttpStatus.OK,
  })
  @ApiParam({ name: 'id', example: JUNIOR_XP.id })
  @Get()
  async execute(@Param('id') id: string): Promise<TalkResponseDTO> {
    const talk = await this.getTalk.execute(new TalkId(id))

    return TalkResponseDTO.create(talk.toPrimitives())
  }
}
*/

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
      throw new Error('Unimplemented method GetTalkEndpoint#')
    }
  ),
}
