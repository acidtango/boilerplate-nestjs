import { Talk } from '../../../src/talks/domain/models/Talk'
import { TalkDescription } from '../../../src/talks/domain/models/TalkDescription'
import { TalkTitle } from '../../../src/talks/domain/models/TalkTitle'
import { EventId } from '../../../src/shared/domain/models/ids/EventId'
import { SpeakerId } from '../../../src/shared/domain/models/ids/SpeakerId'
import { TalkId } from '../../../src/shared/domain/models/ids/TalkId'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers'
import { JUNIOR_XP } from '../../../src/shared/infrastructure/fixtures/talks'
import { flushDomainEvents } from '../Common'
import { OrganizerId } from '../../../src/shared/domain/models/ids/OrganizerId'
import { DAILOS } from '../../../src/shared/infrastructure/fixtures/organizers'

export function juniorXpId() {
  return new TalkId(JUNIOR_XP.id)
}

export function juniorXpTalk({ id = juniorXpId(), cospeakers = JUNIOR_XP.cospeakers } = {}) {
  const talk = Talk.proposal(
    id,
    new TalkTitle(JUNIOR_XP.title),
    new TalkDescription(JUNIOR_XP.description),
    JUNIOR_XP.language,
    cospeakers.map(SpeakerId.fromPrimitives),
    new SpeakerId(CONCHA_ASENSIO.id),
    new EventId(JSDAY_CANARIAS.id)
  )

  return flushDomainEvents(talk)
}

export function juniorXpTalkReviewed() {
  const talk = juniorXpTalk()
  talk.assignForReviewTo(new OrganizerId(DAILOS.id))
  return flushDomainEvents(talk)
}
