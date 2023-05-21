import { TalkEvent } from '../../src/events/domain/TalkEvent'
import { EventId } from '../../src/shared/domain/models/ids/EventId'
import { CODEMOTION_2, JSDAY_CANARIAS } from '../../src/shared/infrastructure/fixtures/events'
import { EventName } from '../../src/events/domain/EventName'
import { EventDateRange } from '../../src/events/domain/EventDateRange'
import { EventProposalsDateRange } from '../../src/events/domain/EventProposalsDateRange'

export function createCodemotionEventId() {
  return new EventId(JSDAY_CANARIAS.id)
}

export function createCodemotionEvent({ id = createCodemotionEventId() } = {}) {
  return new TalkEvent(
    id,
    new EventName(JSDAY_CANARIAS.name),
    new EventDateRange(JSDAY_CANARIAS.startDate, JSDAY_CANARIAS.endDate),
    new EventProposalsDateRange(
      JSDAY_CANARIAS.proposalsStartDate,
      JSDAY_CANARIAS.proposalsDeadlineDate
    )
  )
}

export function createCanariasJSEvent() {
  return new TalkEvent(
    new EventId(CODEMOTION_2.id),
    new EventName(CODEMOTION_2.name),
    new EventDateRange(CODEMOTION_2.startDate, CODEMOTION_2.endDate),
    new EventProposalsDateRange(CODEMOTION_2.proposalsStartDate, CODEMOTION_2.proposalsDeadlineDate)
  )
}
