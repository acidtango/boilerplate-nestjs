import { DomainEvent } from '../../../shared/domain/events/DomainEvent'
import { DomainEventCode } from '../../../shared/domain/events/DomainEventCode'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'

export class TalkProposed extends DomainEvent {
  constructor(private readonly talkId: TalkId) {
    super(DomainEventCode.TALK_PROPOSED)
  }
}
