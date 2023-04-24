import { TalkId } from '../../../shared/domain/ids/TalkId'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { DomainEvent } from '../../../shared/domain/events/DomainEvent'

export class TalkAssignedForReview extends DomainEvent {
  constructor(private readonly talkId: TalkId, private readonly reviewerId: OrganizerId) {
    super()
  }
}
