import { EventId } from '../../../shared/domain/ids/EventId'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { Primitives } from '../../../utils/Primitives'
import { Language } from '../../shared/domain/Language'
import { TalkDescription } from './TalkDescription'
import { TalkStatus } from './TalkStatus'
import { TalkTitle } from './TalkTitle'
import { MaximumCospeakersReachedError } from './errors/MaximumCospeakersReachedError'

export type TalkPrimitives = Primitives<Talk>

export class Talk {
  private constructor(
    private readonly id: TalkId,
    private readonly title: TalkTitle,
    private readonly description: TalkDescription,
    private readonly language: Language,
    private readonly cospeakers: SpeakerId[],
    private readonly status: TalkStatus,
    private readonly speakerId: SpeakerId,
    private readonly eventId: EventId
  ) {
    if (cospeakers.length >= 4) throw new MaximumCospeakersReachedError()
  }

  static create(
    id: TalkId,
    title: TalkTitle,
    description: TalkDescription,
    language: Language,
    cospeakers: SpeakerId[],
    speakerId: SpeakerId,
    eventId: EventId
  ) {
    return new Talk(
      id,
      title,
      description,
      language,
      cospeakers,
      TalkStatus.PROPOSAL,
      speakerId,
      eventId
    )
  }

  static fromPrimitives(talkPrimitives: TalkPrimitives) {
    const { id, cospeakers, description, eventId, language, speakerId, status, title } =
      talkPrimitives

    return new Talk(
      TalkId.fromPrimitives(id),
      TalkTitle.fromPrimitives(title),
      TalkDescription.fromPrimitives(description),
      language,
      cospeakers.map(SpeakerId.fromPrimitives),
      status,
      SpeakerId.fromPrimitives(speakerId),
      EventId.fromPrimitives(eventId)
    )
  }

  hasStatus(status: TalkStatus) {
    return true
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      title: this.title.toPrimitives(),
      description: this.description.toPrimitives(),
      language: this.language,
      cospeakers: this.cospeakers.map(SpeakerId.toPrimitives),
      status: this.status,
      speakerId: this.speakerId.toPrimitives(),
      eventId: this.eventId.toPrimitives(),
    }
  }
}
