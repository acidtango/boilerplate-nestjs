import { describeRoute } from 'hono-openapi'
import { validator } from 'hono-openapi/zod'
import { EventDateRange } from '../../domain/models/EventDateRange.ts'
import { EventId } from '../../../shared/domain/models/ids/EventId.ts'
import { EventName } from '../../domain/models/EventName.ts'
import { EventProposalsDateRange } from '../../domain/models/EventProposalsDateRange.ts'
import { CreateEventRequestDTO } from './dtos/CreateEventRequestDTO.ts'
import { CreateEvent } from '../../use-cases/CreateEvent.ts'
import { factory } from '../../../shared/infrastructure/controllers/factory.ts'

export const CreateEventEndpoint = {
  method: 'post' as const,
  path: '/api/v1/events',
  handlers: factory.createHandlers(
    describeRoute({
      description: 'Creates an event',
      tags: ['Events'],
      responses: {
        201: {
          description: 'Event created',
        },
      },
    }),
    validator('json', CreateEventRequestDTO),
    async (c) => {
      const createEvent = await c.var.container.getAsync(CreateEvent)
      const body = c.req.valid('json')
      const id = EventId.fromPrimitives(body.id)
      const name = EventName.fromPrimitives(body.name)
      const dateRange = EventDateRange.fromPrimitives({
        startDate: new Date(body.dateRange.startDate),
        endDate: new Date(body.dateRange.endDate),
      })
      const proposalsDateRange = EventProposalsDateRange.fromPrimitives({
        startDate: new Date(body.proposalsDateRange.startDate),
        deadline: new Date(body.proposalsDateRange.deadline),
      })
      await createEvent.execute({
        id,
        name,
        dateRange,
        proposalsDateRange,
      })
      return c.body(null, 201)
    }
  ),
}
