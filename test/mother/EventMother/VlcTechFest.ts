import { EventId } from '../../../src/shared/domain/models/ids/EventId'
import { VLCTECHFEST } from '../../../src/shared/infrastructure/fixtures/events'
import { TalkEvent } from '../../../src/events/domain/models/TalkEvent'
import { EventName } from '../../../src/events/domain/models/EventName'
import { EventDateRange } from '../../../src/events/domain/models/EventDateRange'
import { EventProposalsDateRange } from '../../../src/events/domain/models/EventProposalsDateRange'
import { flushDomainEvents } from '../Common'

export function vlcTechFestId() {
  return new EventId(VLCTECHFEST.id)
}

export function vlcTechFestEvent({ id = vlcTechFestId() } = {}) {
  const event = TalkEvent.create(
    id,
    new EventName(VLCTECHFEST.name),
    new EventDateRange(VLCTECHFEST.startDate, VLCTECHFEST.endDate),
    new EventProposalsDateRange(
      VLCTECHFEST.proposalsStartDate,
      VLCTECHFEST.proposalsDeadlineDate
    )
  )

  return flushDomainEvents(event)
}
