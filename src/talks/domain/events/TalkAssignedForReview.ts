import { TalkId } from '../../../shared/domain/models/ids/TalkId.ts'
import { OrganizerId } from '../../../shared/domain/models/ids/OrganizerId.ts'
import { DomainEvent } from '../../../shared/domain/events/DomainEvent.ts'
import { DomainEventCode } from '../../../shared/domain/events/DomainEventCode.ts'

export class TalkAssignedForReview extends DomainEvent {
  private readonly talkId: TalkId

  private readonly reviewerId: OrganizerId

  constructor(talkId: TalkId, reviewerId: OrganizerId) {
    super(DomainEventCode.TALK_ASSIGNED_FOR_REVIEW)
    this.reviewerId = reviewerId
    this.talkId = talkId
  }
}
