import { TalkEvent } from '../../src/codetalk/events/domain/TalkEvent'
import { EventId } from '../../src/codetalk/shared/domain/models/ids/EventId'
import { CANARIASJS, CODEMOTION } from '../../src/codetalk/shared/infrastructure/fixtures/events'
import { EventName } from '../../src/codetalk/events/domain/EventName'
import { EventDateRange } from '../../src/codetalk/events/domain/EventDateRange'
import { EventProposalsDateRange } from '../../src/codetalk/events/domain/EventProposalsDateRange'

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
