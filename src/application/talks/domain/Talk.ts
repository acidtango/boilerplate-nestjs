import { Primitives } from '../../../utils/Primitives'
import { EventId } from '../../events/domain/EventId'
import { Language } from '../../shared/domain/Language'
import { SpeakerId } from '../../speakers/domain/SpeakerId'
import { TalkDescription } from './TalkDescription'
import { TalkId } from './TalkId'
import { TalkStatus } from './TalkStatus'
import { TalkTitle } from './TalkTitle'

export type TalkPrimitives = Primitives<Talk>

export class Talk {
  constructor(
    private readonly id: TalkId,
    private readonly title: TalkTitle,
    private readonly description: TalkDescription,
    private readonly language: Language,
    private readonly cospeakers: string[],
    private readonly status: TalkStatus,
    private readonly speakerId: SpeakerId,
    private readonly eventId: EventId
  ) {}

  static fromPrimitives(talkPrimitives: TalkPrimitives) {
    const { id, cospeakers, description, eventId, language, speakerId, status, title } =
      talkPrimitives

    return new Talk(
      TalkId.fromPrimitives(id),
      TalkTitle.fromPrimitives(title),
      TalkDescription.fromPrimitives(description),
      language,
      cospeakers,
      status,
      SpeakerId.fromPrimitives(speakerId),
      EventId.fromPrimitives(eventId)
    )
  }

  getStatus() {
    return TalkStatus.PROPOSAL
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      title: this.title.toPrimitives(),
      description: this.description.toPrimitives(),
      language: this.language,
      cospeakers: this.cospeakers,
      status: this.status,
      speakerId: this.speakerId.toPrimitives(),
      eventId: this.eventId.toPrimitives(),
    }
  }
}
