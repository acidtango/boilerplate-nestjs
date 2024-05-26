import { DomainEvent } from '../../../shared/domain/events/DomainEvent'
import { DomainEventCode } from '../../../shared/domain/events/DomainEventCode'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { Primitives } from '../../../shared/domain/models/hex/Primitives'
import { DomainId } from '../../../shared/domain/models/hex/DomainId'

type TalkProposedPrimitives = Primitives<TalkProposed>

export class TalkProposed extends DomainEvent {
  public static readonly code = DomainEventCode.TALK_PROPOSED

  public static fromPrimitives(primitives: TalkProposedPrimitives) {
    return new TalkProposed(
      TalkId.fromPrimitives(primitives.talkId),
      new DomainId(primitives.eventId),
      new Date(primitives.occurredAt)
    )
  }

  public static emit(talkId: TalkId) {
    return new TalkProposed(talkId)
  }

  private constructor(
    public readonly talkId: TalkId,
    eventId?: DomainId,
    occurredAt?: Date
  ) {
    super(DomainEventCode.TALK_PROPOSED, eventId, occurredAt)
  }

  toPrimitives() {
    const commonPrimitives = DomainEvent.toPrimitives(this)

    return {
      ...commonPrimitives,
      talkId: this.talkId.toPrimitives(),
    }
  }
}
