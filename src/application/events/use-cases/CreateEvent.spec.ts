import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventDateRange } from '../domain/EventDateRange'
import { EventId } from '../domain/EventId'
import { EventName } from '../domain/EventName'
import { EventProposalsDateRange } from '../domain/EventProposalsDateRange'
import { CreateEvent } from './CreateEvent'
import { EventRepository } from '../domain/EventRepository'
import { EventRepositoryMemory } from '../domain/EventRepositoryMemory'

describe('CreateEvent', () => {
  it('saves the event in the repository ', () => {
    const eventRepository: EventRepository = new EventRepositoryMemory()
    jest.spyOn(eventRepository, 'save')
    const createEventUseCase = new CreateEvent(eventRepository)
    const params = {
      id: new EventId(CODEMOTION.id),
      name: new EventName(CODEMOTION.name),
      dateRange: new EventDateRange(CODEMOTION.startDate, CODEMOTION.endDate),
      proposalsDateRange: new EventProposalsDateRange(
        CODEMOTION.proposalsStartDate,
        CODEMOTION.proposalsDeadlineDate
      ),
    }

    createEventUseCase.execute(params)

    expect(eventRepository.save).toHaveBeenCalled()
  })
})
