import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { EventDateRange } from '../../domain/models/EventDateRange'
import { EventId } from '../../../shared/domain/models/ids/EventId'
import { EventName } from '../../domain/models/EventName'
import { EventProposalsDateRange } from '../../domain/models/EventProposalsDateRange'
import { CreateEvent } from '../../use-cases/CreateEvent'
import { CreateEventRequestDTO } from './dtos/CreateEventRequestDTO'

@Controller('/v1/events')
export class CreateEventEndpoint {
  constructor(private readonly createEvent: CreateEvent) {}

  @Endpoint({
    tag: DocumentationTag.EVENTS,
    description: 'Create new event',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: CreateEventRequestDTO) {
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

    await this.createEvent.execute({ id, name, dateRange, proposalsDateRange })
  }
}
