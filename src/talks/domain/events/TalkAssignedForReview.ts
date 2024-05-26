import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { OrganizerId } from '../../../shared/domain/models/ids/OrganizerId'
import { DomainEvent } from '../../../shared/domain/events/DomainEvent'
import { DomainEventCode } from '../../../shared/domain/events/DomainEventCode'

export class TalkAssignedForReview extends DomainEvent {
  constructor(
    private readonly talkId: TalkId,
    private readonly reviewerId: OrganizerId
  ) {
    super(DomainEventCode.TALK_ASSIGNED_FOR_REVIEW)
  }
}
