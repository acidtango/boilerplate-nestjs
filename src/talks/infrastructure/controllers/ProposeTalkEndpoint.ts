import { describeRoute } from 'hono-openapi'
import { validator } from 'hono-openapi/zod'
import { ProposeTalkRequestDTO } from './dtos/ProposeTalkRequestDTO.ts'
import { factory } from '../../../shared/infrastructure/controllers/factory.js'

/* @Controller('/v1/talks')
export class ProposeTalkEndpoint {
  constructor(private readonly proposeTalk: ProposeTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Creates a talk',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: ProposeTalkRequestDTO) {
    await this.proposeTalk.execute({
      id: TalkId.fromPrimitives(body.id),
      title: TalkTitle.fromPrimitives(body.title),
      description: TalkDescription.fromPrimitives(body.description),
      cospeakers: body.cospeakers.map(SpeakerId.fromPrimitives),
      language: body.language,
      eventId: EventId.fromPrimitives(body.eventId),
      speakerId: SpeakerId.fromPrimitives(body.speakerId),
    })
  }
}
*/

export const ProposeTalkEndpoint = {
  method: 'post' as const,
  path: '/api/v1/talks',
  handlers: factory.createHandlers(
    describeRoute({
      description: 'Proposes a talk',
      tags: ['Talks'], // TODO: use enum
      responses: {
        201: {
          description: 'Talk proposed',
        },
      },
    }),
    validator('json', ProposeTalkRequestDTO),
    async (c) => {
      return c.body(null, 201)
    }
  ),
}
