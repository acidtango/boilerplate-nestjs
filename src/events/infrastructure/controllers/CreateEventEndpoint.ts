import type { interfaces } from 'inversify'
import { EventDateRange } from '../../domain/models/EventDateRange.ts'
import { EventId } from '../../../shared/domain/models/ids/EventId.ts'
import { EventName } from '../../domain/models/EventName.ts'
import { EventProposalsDateRange } from '../../domain/models/EventProposalsDateRange.ts'
import { CreateEvent } from '../../use-cases/CreateEvent.ts'
import { CreateEventRequestDTO } from './dtos/CreateEventRequestDTO.ts'
import type { HonoController } from '../../../shared/infrastructure/HonoController.ts'
import { createRoute, OpenAPIHono, type RouteConfig } from '@hono/zod-openapi'

export class CreateEventController implements HonoController {
  private static Schema = {
    method: 'post',
    path: '/api/v1/events',
    tags: ['events'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateEventRequestDTO,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Speaker registered',
      },
    },
  } satisfies RouteConfig

  public static async create({ container }: interfaces.Context) {
    return new CreateEventController(await container.getAsync(CreateEvent))
  }

  private readonly createEvent: CreateEvent

  constructor(createEvent: CreateEvent) {
    this.createEvent = createEvent
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(CreateEventController.Schema), async (c) => {
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
      await this.createEvent.execute({
        id,
        name,
        dateRange,
        proposalsDateRange,
      })
      return c.body(null, 201)
    })
  }
}
