import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { Primitives } from '../../../utils/Primitives'
import { Language } from '../../shared/domain/Language'

export type TalkPrimitives = Primitives<Talk>

export class Talk extends AggregateRoot {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly language: Language,
    public readonly cospeakers: string[],
    public readonly speakerId: string,
    public readonly eventId: string,
    public reviewerId?: string,
    public isApproved?: boolean
  ) {
    super()
  }

  static fromPrimitives(talkPrimitives: TalkPrimitives) {
    const {
      id,
      cospeakers,
      description,
      eventId,
      language,
      speakerId,
      title,
      reviewerId,
      isApproved,
    } = talkPrimitives

    return new Talk(
      id,
      title,
      description,
      language,
      cospeakers,
      speakerId,
      eventId,
      reviewerId ? reviewerId : undefined,
      typeof isApproved === 'boolean' ? isApproved : undefined
    )
  }
  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      language: this.language,
      cospeakers: this.cospeakers,
      speakerId: this.speakerId,
      reviewerId: this.reviewerId,
      eventId: this.eventId,
      isApproved: this.isApproved,
    }
  }
}
