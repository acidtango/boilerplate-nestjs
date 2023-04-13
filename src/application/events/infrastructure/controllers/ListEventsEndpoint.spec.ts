import { CANARIASJS, CODEMOTION } from '../../../../shared/fixtures/events'
import { ListEvents } from '../../use-cases/ListEvents'
import { EventResponseDTO } from './dtos/EventResponseDTO'
import { ListEventsEndpoint } from './ListEventsEndpoint'
import { TalkEvent } from '../../domain/TalkEvent'
import { EventId } from '../../domain/EventId'
import { EventName } from '../../domain/EventName'
import { EventDateRange } from '../../domain/EventDateRange'
import { EventProposalsDateRange } from '../../domain/EventProposalsDateRange'

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
        .mockReturnValue(
          Promise.resolve([
            new TalkEvent(
              new EventId(CODEMOTION.id),
              new EventName(CODEMOTION.name),
              new EventDateRange(CODEMOTION.startDate, CODEMOTION.endDate),
              new EventProposalsDateRange(
                CODEMOTION.proposalsStartDate,
                CODEMOTION.proposalsDeadlineDate
              )
            ),
          ])
        ),
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
            new TalkEvent(
              new EventId(CODEMOTION.id),
              new EventName(CODEMOTION.name),
              new EventDateRange(CODEMOTION.startDate, CODEMOTION.endDate),
              new EventProposalsDateRange(
                CODEMOTION.proposalsStartDate,
                CODEMOTION.proposalsDeadlineDate
              )
            ),
            new TalkEvent(
              new EventId(CANARIASJS.id),
              new EventName(CANARIASJS.name),
              new EventDateRange(CANARIASJS.startDate, CANARIASJS.endDate),
              new EventProposalsDateRange(
                CANARIASJS.proposalsStartDate,
                CANARIASJS.proposalsDeadlineDate
              )
            ),
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
