import { EventDateRange } from '../../domain/EventDateRange'
import { EventId } from '../../domain/EventId'
import { EventName } from '../../domain/EventName'
import { EventProposalsDateRange } from '../../domain/EventProposalsDateRange'
import { CreateEvent } from '../../use-cases/CreateEvent'
import { CreateEventRequestDTO } from './dtos/CreateEventRequestDTO'

export class CreateEventEndpoint {
  constructor(private readonly createEvent: CreateEvent) {}

  async execute(body: CreateEventRequestDTO) {
    const id = EventId.fromPrimitives(body.id)
    const name = EventName.fromPrimitives(body.name)
    const dateRange = EventDateRange.fromPrimitives(body.dateRange)
    const proposalsDateRange = EventProposalsDateRange.fromPrimitives(body.proposalsDateRange)

    await this.createEvent.execute({ id, name, dateRange, proposalsDateRange })
  }
}
