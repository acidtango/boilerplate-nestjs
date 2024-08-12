import { ListEvents } from '../../use-cases/ListEvents.ts'
import { createRoute, OpenAPIHono, type RouteConfig, z } from '@hono/zod-openapi'
import type { interfaces } from 'inversify'
import type { HonoController } from '../../../shared/infrastructure/HonoController.ts'
import { EventResponseDTO } from './dtos/EventResponseDTO.ts'

export class ListEventsEndpoint implements HonoController {
  private static Schema = {
    method: 'get',
    path: '/api/v1/events',
    description: 'List events',
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

  public static create({ container }: interfaces.Context) {
    return new ListEventsEndpoint(container.get(ListEvents))
  }

  private readonly listEvents: ListEvents

  constructor(listEvents: ListEvents) {
    this.listEvents = listEvents
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(ListEventsEndpoint.Schema), async (c) => {
      const events = await this.listEvents.execute()

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
}
