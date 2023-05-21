import { EventId } from '../../../src/shared/domain/models/ids/EventId'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events'
import { TalkEvent } from '../../../src/events/domain/models/TalkEvent'
import { EventName } from '../../../src/events/domain/models/EventName'
import { EventDateRange } from '../../../src/events/domain/models/EventDateRange'
import { EventProposalsDateRange } from '../../../src/events/domain/models/EventProposalsDateRange'
import { flushDomainEvents } from '../Common'

export function jsdayId() {
  return new EventId(JSDAY_CANARIAS.id)
}

export function jsdayEvent({ id = jsdayId() } = {}) {
  const event = TalkEvent.create(
    id,
    new EventName(JSDAY_CANARIAS.name),
    new EventDateRange(JSDAY_CANARIAS.startDate, JSDAY_CANARIAS.endDate),
    new EventProposalsDateRange(
      JSDAY_CANARIAS.proposalsStartDate,
      JSDAY_CANARIAS.proposalsDeadlineDate
    )
  )

  return flushDomainEvents(event)
}
