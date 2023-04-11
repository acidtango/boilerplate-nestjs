import { Controller, Get, HttpStatus } from '@nestjs/common'
import { CODEMOTION } from '../../../../shared/fixtures/events'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
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

    return [
      {
        id: CODEMOTION.id,
        name: CODEMOTION.name,
        dateRange: {
          startDate: CODEMOTION.startDate.toISOString(),
          endDate: CODEMOTION.endDate.toISOString(),
        },
        proposalsDateRange: {
          startDate: CODEMOTION.proposalsStartDate.toISOString(),
          deadline: CODEMOTION.proposalsDeadlineDate.toISOString(),
        },
      },
    ]
  }
}
