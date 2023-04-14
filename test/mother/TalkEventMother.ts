import { TalkEvent } from '../../src/application/events/domain/TalkEvent'
import { EventId } from '../../src/application/events/domain/EventId'
import { CANARIASJS, CODEMOTION } from '../../src/shared/fixtures/events'
import { EventName } from '../../src/application/events/domain/EventName'
import { EventDateRange } from '../../src/application/events/domain/EventDateRange'
import { EventProposalsDateRange } from '../../src/application/events/domain/EventProposalsDateRange'

export function createCodemotionEvent() {
  return new TalkEvent(
    new EventId(CODEMOTION.id),
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
