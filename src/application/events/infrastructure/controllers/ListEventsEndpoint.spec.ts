import { CANARIASJS, CODEMOTION } from '../../../../shared/fixtures/events'
import { ListEvents } from '../../use-cases/ListEvents'
import { EventResponseDTO } from './dtos/EventResponseDTO'
import { ListEventsEndpoint } from './ListEventsEndpoint'
import { TalkEvent } from '../../domain/TalkEvent'
import { EventId } from '../../domain/EventId'

describe('ListEventsEndpoint', () => {
  it('returns an empty array if there are no events', async () => {
    const listEventUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve([])),
    } as unknown as ListEvents
    const endpoint = new ListEventsEndpoint(listEventUseCase)

    const events = await endpoint.execute()

    expect(events).toHaveLength(0)
  })

  it('serializes one event', async () => {
    const listEventUseCase = {
      execute: jest
        .fn()
        .mockReturnValue(Promise.resolve([new TalkEvent(new EventId(CODEMOTION.id))])),
    } as unknown as ListEvents
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

  it('serializes multiple events', async () => {
    const listEventUseCase = {
      execute: jest
        .fn()
        .mockReturnValue(
          Promise.resolve([
            new TalkEvent(new EventId(CODEMOTION.id)),
            new TalkEvent(new EventId(CANARIASJS.id)),
          ])
        ),
    } as unknown as ListEvents
    const endpoint = new ListEventsEndpoint(listEventUseCase)

    const events = await endpoint.execute()
    const secondEvent: EventResponseDTO = events[1]

    expect(events).toHaveLength(2)
    expect(secondEvent.id).toEqual(CANARIASJS.id)
    expect(secondEvent.name).toEqual(CANARIASJS.name)
    expect(secondEvent.dateRange.startDate).toEqual(CANARIASJS.startDate.toISOString())
    expect(secondEvent.dateRange.endDate).toEqual(CANARIASJS.endDate.toISOString())
    expect(secondEvent.proposalsDateRange.startDate).toEqual(
      CANARIASJS.proposalsStartDate.toISOString()
    )
    expect(secondEvent.proposalsDateRange.deadline).toEqual(
      CANARIASJS.proposalsDeadlineDate.toISOString()
    )
  })
})
