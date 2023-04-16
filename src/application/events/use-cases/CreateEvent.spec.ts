import { CODEMOTION } from '../../../shared/fixtures/events'
import { EventDateRange } from '../domain/EventDateRange'
import { EventId } from '../domain/EventId'
import { EventName } from '../domain/EventName'
import { EventProposalsDateRange } from '../domain/EventProposalsDateRange'
import { CreateEvent, CreateEventParams } from './CreateEvent'
import { EventRepositoryMemory } from '../infrastructure/repositories/EventRepositoryMemory'
import { EventAlreadyCreatedError } from '../domain/errors/EventAlreadyCreatedError'

describe('CreateEvent', () => {
  it('saves the event in the repository', async () => {
    const eventRepository = new EventRepositoryMemory()
    jest.spyOn(eventRepository, 'save')
    const createEventUseCase = new CreateEvent(eventRepository)
    const params = generateCreateCodemotionParams()

    await createEventUseCase.execute(params)

    expect(eventRepository.save).toHaveBeenCalled()
  })

  it('fails if event already exists', async () => {
    const eventRepository = new EventRepositoryMemory()
    jest.spyOn(eventRepository, 'exists').mockReturnValue(Promise.resolve(true))
    const createEventUseCase = new CreateEvent(eventRepository)
    const params = generateCreateCodemotionParams()

    await expect(createEventUseCase.execute(params)).rejects.toThrowError(
      new EventAlreadyCreatedError(new EventId(CODEMOTION.id))
    )
  })
})

function generateCreateCodemotionParams(): CreateEventParams {
  return {
    id: new EventId(CODEMOTION.id),
    name: new EventName(CODEMOTION.name),
    dateRange: new EventDateRange(CODEMOTION.startDate, CODEMOTION.endDate),
    proposalsDateRange: new EventProposalsDateRange(
      CODEMOTION.proposalsStartDate,
      CODEMOTION.proposalsDeadlineDate
    ),
  }
}
