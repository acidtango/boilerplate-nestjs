import { Controller, Get, HttpStatus } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { ListEvents } from '../../use-cases/ListEvents'
import { EventResponseDTO } from './dtos/EventResponseDTO'

@Controller('/v1/events')
export class ListEventsEndpoint {
  constructor(private readonly listEvents: ListEvents) {}

  @Endpoint({
    tag: DocumentationTag.EVENTS,
    description: 'List events',
    status: HttpStatus.OK,
  })
  @Get()
  async execute(): Promise<EventResponseDTO[]> {
    const events = await this.listEvents.execute()

    return events.map((event) => {
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
  }
}
