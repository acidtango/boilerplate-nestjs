import { TalkEvent } from '../../../src/events/domain/models/TalkEvent'
import { EventId } from '../../../src/shared/domain/models/ids/EventId'
import { CODEMOTION } from '../../../src/shared/infrastructure/fixtures/events'
import { EventName } from '../../../src/events/domain/models/EventName'
import { EventDateRange } from '../../../src/events/domain/models/EventDateRange'
import { EventProposalsDateRange } from '../../../src/events/domain/models/EventProposalsDateRange'
import { flushDomainEvents } from '../Common'

export function codemotionEvent() {
  const event = TalkEvent.create(
    new EventId(CODEMOTION.id),
    new EventName(CODEMOTION.name),
    new EventDateRange(CODEMOTION.startDate, CODEMOTION.endDate),
    new EventProposalsDateRange(CODEMOTION.proposalsStartDate, CODEMOTION.proposalsDeadlineDate)
  )

  return flushDomainEvents(event)
}
