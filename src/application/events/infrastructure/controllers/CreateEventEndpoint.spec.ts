import { CODEMOTION } from '../../../../shared/fixtures/events'
import { EventDateRange } from '../../domain/EventDateRange'
import { EventId } from '../../domain/EventId'
import { EventName } from '../../domain/EventName'
import { EventProposalsDateRange } from '../../domain/EventProposalsDateRange'
import { CreateEvent } from '../../use-cases/CreateEvent'
import { CreateEventEndpoint } from './CreateEventEndpoint'
import { CreateEventRequestDTO } from './dtos/CreateEventRequestDTO'
import { DateRangeRequestDTO } from './dtos/DateRangeRequestDTO'
import { ProposalDateRangeRequestDTO } from './dtos/ProposalDateRangeRequestDTO'

describe('CreateEventEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const createEventUseCase: CreateEvent = { execute: jest.fn() }
    const endpoint = new CreateEventEndpoint(createEventUseCase)
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

    expect(createEventUseCase.execute).toHaveBeenCalledWith({
      id: EventId.fromPrimitives(CODEMOTION.id),
      name: EventName.fromPrimitives(CODEMOTION.name),
      dateRange: EventDateRange.fromPrimitives({
        startDate: CODEMOTION.startDate,
        endDate: CODEMOTION.endDate,
      }),
      proposalsDateRange: EventProposalsDateRange.fromPrimitives({
        startDate: CODEMOTION.proposalsStartDate,
        deadline: CODEMOTION.proposalsDeadlineDate,
      }),
    })
  })
})
