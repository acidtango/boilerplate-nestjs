import { TalkEvent } from '../../src/events/domain/TalkEvent'
import { EventId } from '../../src/shared/domain/models/ids/EventId'
import { CANARIASJS, CODEMOTION } from '../../src/shared/infrastructure/fixtures/events'
import { EventName } from '../../src/events/domain/EventName'
import { EventDateRange } from '../../src/events/domain/EventDateRange'
import { EventProposalsDateRange } from '../../src/events/domain/EventProposalsDateRange'

export function createCodemotionEventId() {
  return new EventId(CODEMOTION.id)
}

export function createCodemotionEvent({ id = createCodemotionEventId() } = {}) {
  return new TalkEvent(
    id,
    new EventName(CODEMOTION.name),
    new EventDateRange(CODEMOTION.startDate, CODEMOTION.endDate),
    new EventProposalsDateRange(CODEMOTION.proposalsStartDate, CODEMOTION.proposalsDeadlineDate)
  )
}

export function createCanariasJSEvent() {
  return new TalkEvent(
    new EventId(CANARIASJS.id),
    new EventName(CANARIASJS.name),
    new EventDateRange(CANARIASJS.startDate, CANARIASJS.endDate),
    new EventProposalsDateRange(CANARIASJS.proposalsStartDate, CANARIASJS.proposalsDeadlineDate)
  )
}
