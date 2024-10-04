import { ListEvents } from '../../use-cases/ListEvents.ts'
import { createRoute, OpenAPIHono, type RouteConfig, z } from '@hono/zod-openapi'
import { EventResponseDTO } from './dtos/EventResponseDTO.ts'

export const Schema = {
  method: 'get',
  path: '/api/v1/events',
  description: 'List events',
  tags: ['events'],
  responses: {
    200: {
      description: 'Speaker registered',
      content: {
        'application/json': {
          schema: z.array(EventResponseDTO),
        },
      },
    },
  },
} satisfies RouteConfig

export function listEvents(api: OpenAPIHono) {
  api.openapi(createRoute(Schema), async (c) => {
    const listEvents = await c.var.container.getAsync(ListEvents)
    const events = await listEvents.execute()

    const mapped = events.map((event) => {
      const eventPrimitives = event.toPrimitives()

      return {
        id: eventPrimitives.id,
        name: eventPrimitives.name,
        dateRange: {
          startDate: eventPrimitives.dateRange.startDate.toISOString(),
          endDate: eventPrimitives.dateRange.endDate.toISOString(),
        },
        proposalsDateRange: {
          startDate: eventPrimitives.proposalsDateRange.startDate.toISOString(),
          deadline: eventPrimitives.proposalsDateRange.deadline.toISOString(),
        },
      }
    })

    return c.json(mapped, 200)
  })
}
