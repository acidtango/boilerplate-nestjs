import { TalkEvent } from '../../src/events/domain/TalkEvent'
import { EventId } from '../../src/shared/domain/models/ids/EventId'
import { CODEMOTION, JSDAY_CANARIAS } from '../../src/shared/infrastructure/fixtures/events'
import { EventName } from '../../src/events/domain/EventName'
import { EventDateRange } from '../../src/events/domain/EventDateRange'
import { EventProposalsDateRange } from '../../src/events/domain/EventProposalsDateRange'

export function jsdayId() {
  return new EventId(JSDAY_CANARIAS.id)
}

export function jsdayEvent({ id = jsdayId() } = {}) {
  return TalkEvent.create(
    id,
    new EventName(JSDAY_CANARIAS.name),
    new EventDateRange(JSDAY_CANARIAS.startDate, JSDAY_CANARIAS.endDate),
    new EventProposalsDateRange(
      JSDAY_CANARIAS.proposalsStartDate,
      JSDAY_CANARIAS.proposalsDeadlineDate
    )
  )
}

export function codemotionEvent() {
  return TalkEvent.create(
    new EventId(CODEMOTION.id),
    new EventName(CODEMOTION.name),
    new EventDateRange(CODEMOTION.startDate, CODEMOTION.endDate),
    new EventProposalsDateRange(CODEMOTION.proposalsStartDate, CODEMOTION.proposalsDeadlineDate)
  )
}
