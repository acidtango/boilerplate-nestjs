import { CODEMOTION } from '../../../../shared/fixtures/events'
import { EventDateRange } from '../../domain/EventDateRange'
import { EventId } from '../../domain/EventId'
import { EventName } from '../../domain/EventName'
import { EventProposalDateRange } from '../../domain/EventProposalDateRange'
import { CreateEvent } from '../../use-cases/CreateEvent'
import { CreateEventEndpoint } from './CreateEventEndpoint'
import { CreateEventRequestDTO } from './dtos/CreateEventRequestDTO'
import { DateRangeRequestDTO } from './dtos/DateRangeRequestDTO'
import { ProposalDateRangeRequestDTO } from './dtos/ProposalDateRangeRequestDTO'

describe('CreateEventEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const endpoint = new CreateEventEndpoint()
    const createEventUseCase: CreateEvent = { execute: jest.fn() }
    const createEventRequestDTO = new CreateEventRequestDTO({
      id: CODEMOTION.id,
      name: CODEMOTION.name,
      dateRange: new DateRangeRequestDTO(CODEMOTION.startDate, CODEMOTION.endDate),
      proposalsDateRange: new ProposalDateRangeRequestDTO(
        CODEMOTION.proposalsStartDate,
        CODEMOTION.proposalsDeadlineDate
      ),
    })

    await endpoint.execute(createEventRequestDTO)

    expect(createEventUseCase).toHaveBeenCalledWith({
      id: EventId.fromPrimitives(CODEMOTION.id),
      name: EventName.fromPrimitives(CODEMOTION.name),
      dateRange: EventDateRange.fromPrimitives(CODEMOTION.startDate, CODEMOTION.endDate),
      proposalsDateRange: EventProposalDateRange.fromPrimitives(
        CODEMOTION.proposalsStartDate,
        CODEMOTION.proposalsDeadlineDate
      ),
    })
  })
})
