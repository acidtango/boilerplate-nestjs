import { Talk } from '../../../src/talks/domain/models/Talk'
import { TalkDescription } from '../../../src/talks/domain/models/TalkDescription'
import { TalkTitle } from '../../../src/talks/domain/models/TalkTitle'
import { EventId } from '../../../src/shared/domain/models/ids/EventId'
import { SpeakerId } from '../../../src/shared/domain/models/ids/SpeakerId'
import { TalkId } from '../../../src/shared/domain/models/ids/TalkId'
import { VLCTECHFEST } from '../../../src/shared/infrastructure/fixtures/events'
import { PAOLA } from '../../../src/shared/infrastructure/fixtures/speakers'
import { DISCOVERING_TECH_TALENT } from '../../../src/shared/infrastructure/fixtures/talks'
import { flushDomainEvents } from '../Common'
import { OrganizerId } from '../../../src/shared/domain/models/ids/OrganizerId'
import { CESAR } from '../../../src/shared/infrastructure/fixtures/organizers'

export function discoveringTechTalentId() {
  return new TalkId(DISCOVERING_TECH_TALENT.id)
}

export function discoveringTechTalentTalk({ id = discoveringTechTalentId(), cospeakers = DISCOVERING_TECH_TALENT.cospeakers } = {}) {
  const talk = Talk.proposal(
    id,
    new TalkTitle(DISCOVERING_TECH_TALENT.title),
    new TalkDescription(DISCOVERING_TECH_TALENT.description),
    DISCOVERING_TECH_TALENT.language,
    cospeakers.map(SpeakerId.fromPrimitives),
    new SpeakerId(PAOLA.id),
    new EventId(VLCTECHFEST.id)
  )

  return flushDomainEvents(talk)
}

export function discoveringTechTalentTalkReviewed() {
  const talk = discoveringTechTalentTalk()
  talk.assignForReviewTo(new OrganizerId(CESAR.id))
  return flushDomainEvents(talk)
}
