import { CODEMOTION } from '../../../../shared/fixtures/events'
import { EventDateRange } from '../../domain/EventDateRange'
import { EventName } from '../../domain/EventName'
import { EventProposalsDateRange } from '../../domain/EventProposalsDateRange'
import { CreateEvent } from '../../use-cases/CreateEvent'
import { CreateEventEndpoint } from './CreateEventEndpoint'
import { CreateEventRequestDTO } from './dtos/CreateEventRequestDTO'
import { DateRangeDTO } from './dtos/DateRangeDTO'
import { ProposalDateRangeDTO } from './dtos/ProposalDateRangeDTO'

describe('CreateEventEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const createEventUseCase = { execute: jest.fn() } as unknown as CreateEvent
    const endpoint = new CreateEventEndpoint(createEventUseCase)
    const createEventRequestDTO = CreateEventRequestDTO.create({
      id: CODEMOTION.id,
      name: CODEMOTION.name,
      dateRange: DateRangeDTO.create(CODEMOTION.startDate, CODEMOTION.endDate),
      proposalsDateRange: ProposalDateRangeDTO.create(
        CODEMOTION.proposalsStartDate,
        CODEMOTION.proposalsDeadlineDate
      ),
    })

    await endpoint.execute(createEventRequestDTO)

    expect(createEventUseCase.execute).toHaveBeenCalledWith({
      id: CODEMOTION.id,
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
