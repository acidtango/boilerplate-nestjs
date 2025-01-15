import { describeRoute } from 'hono-openapi'
import { validator } from 'hono-openapi/zod'
import { ProposeTalkRequestDTO } from './dtos/ProposeTalkRequestDTO.ts'
import { factory } from '../../../shared/infrastructure/controllers/factory.js'
import { ProposeTalk } from '../../use-cases/ProposeTalk.js'
import { TalkId } from '../../../shared/domain/models/ids/TalkId.js'
import { TalkTitle } from '../../domain/models/TalkTitle.js'
import { TalkDescription } from '../../domain/models/TalkDescription.js'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId.js'
import { EventId } from '../../../shared/domain/models/ids/EventId.js'

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
      const proposeTalk = await c.var.container.getAsync(ProposeTalk)
      const body = c.req.valid('json')

      await proposeTalk.execute({
        id: TalkId.fromPrimitives(body.id),
        title: TalkTitle.fromPrimitives(body.title),
        description: TalkDescription.fromPrimitives(body.description),
        cospeakers: body.cospeakers.map(SpeakerId.fromPrimitives),
        language: body.language,
        eventId: EventId.fromPrimitives(body.eventId),
        speakerId: SpeakerId.fromPrimitives(body.speakerId),
      })

      return c.body(null, 201)
    }
  ),
}
