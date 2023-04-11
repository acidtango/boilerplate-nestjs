import { CODEMOTION } from '../../../../shared/fixtures/events'
import { ListEvents } from '../../use-cases/ListEvents'
import { EventResponseDTO } from './dtos/EventResponseDTO'
import { ListEventsEndpoint } from './ListEventsEndpoint'

describe('ListEventsEndpoint', () => {
  it('returns an empty array if there are no events', async () => {
    const listEventUseCase: ListEvents = { execute: jest.fn() }
    const endpoint = new ListEventsEndpoint(listEventUseCase)

    const events = await endpoint.execute()

    expect(events).toHaveLength(0)
  })

  it('serializes one event', async () => {
    const listEventUseCase: ListEvents = { execute: jest.fn() }
    const endpoint = new ListEventsEndpoint(listEventUseCase)

    const events = await endpoint.execute()
    const firstEvent: EventResponseDTO = events[0]

    expect(events).toHaveLength(1)
    expect(firstEvent.id).toEqual(CODEMOTION.id)
    expect(firstEvent.name).toEqual(CODEMOTION.name)
    expect(firstEvent.dateRange.startDate).toEqual(CODEMOTION.startDate.toISOString())
    expect(firstEvent.dateRange.endDate).toEqual(CODEMOTION.endDate.toISOString())
    expect(firstEvent.proposalsDateRange.startDate).toEqual(
      CODEMOTION.proposalsStartDate.toISOString()
    )
    expect(firstEvent.proposalsDateRange.deadline).toEqual(
      CODEMOTION.proposalsDeadlineDate.toISOString()
    )
  })
})
