import { TalkEvent } from '../../src/application/events/domain/TalkEvent'
import { EventId } from '../../src/application/shared/domain/models/ids/EventId'
import { CANARIASJS, CODEMOTION } from '../../src/application/shared/infrastructure/fixtures/events'
import { EventName } from '../../src/application/events/domain/EventName'
import { EventDateRange } from '../../src/application/events/domain/EventDateRange'
import { EventProposalsDateRange } from '../../src/application/events/domain/EventProposalsDateRange'

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
