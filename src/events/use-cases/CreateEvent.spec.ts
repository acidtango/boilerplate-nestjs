import { VLCTECHFEST } from '../../shared/infrastructure/fixtures/events'
import { EventDateRange } from '../domain/models/EventDateRange'
import { EventId } from '../../shared/domain/models/ids/EventId'
import { EventName } from '../domain/models/EventName'
import { EventProposalsDateRange } from '../domain/models/EventProposalsDateRange'
import { CreateEvent, CreateEventParams } from './CreateEvent'
import { EventAlreadyCreatedError } from '../domain/errors/EventAlreadyCreatedError'
import { EventRepositoryFake } from '../../../test/fakes/EventRepositoryFake'
import { vlcTechFestEvent, vlcTechFestId } from '../../../test/mother/EventMother/VlcTechFest'

describe('CreateEvent', () => {
  let eventRepository: EventRepositoryFake
  let createEventUseCase: CreateEvent

  beforeEach(() => {
    eventRepository = EventRepositoryFake.empty()
    createEventUseCase = new CreateEvent(eventRepository)
  })

  it('saves the event in the repository', async () => {
    const params = createVlcTechFestParams()

    await createEventUseCase.execute(params)

    eventRepository.expectSaveToHaveBeenCalled()
  })

  it('fails if event already exists', async () => {
    await eventRepository.save(vlcTechFestEvent())
    const params = createVlcTechFestParams()

    const result = createEventUseCase.execute(params)

    await expect(result).rejects.toThrow(new EventAlreadyCreatedError(vlcTechFestId()))
  })
})

function createVlcTechFestParams(): CreateEventParams {
  return {
    id: new EventId(VLCTECHFEST.id),
    name: new EventName(VLCTECHFEST.name),
    dateRange: new EventDateRange(VLCTECHFEST.startDate, VLCTECHFEST.endDate),
    proposalsDateRange: new EventProposalsDateRange(
      VLCTECHFEST.proposalsStartDate,
      VLCTECHFEST.proposalsDeadlineDate
    ),
  }
}
