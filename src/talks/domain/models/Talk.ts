import { AggregateRoot } from '../../../shared/domain/models/hex/AggregateRoot'
import { EventId } from '../../../shared/domain/models/ids/EventId'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { Primitives } from '../../../shared/domain/models/hex/Primitives'
import { Language } from '../../../shared/domain/models/Language'
import { TalkDescription } from './TalkDescription'
import { TalkStatus } from './TalkStatus'
import { TalkTitle } from './TalkTitle'
import { MaximumCospeakersReachedError } from '../errors/MaximumCospeakersReachedError'
import { TalkProposed } from '../events/TalkProposed'

export type TalkPrimitives = Primitives<Talk>

export class Talk extends AggregateRoot {
  static fromPrimitives(talkPrimitives: TalkPrimitives) {
    const { id, cospeakers, description, eventId, language, speakerId, title } = talkPrimitives

    return new Talk(
      TalkId.fromPrimitives(id),
      TalkTitle.fromPrimitives(title),
      TalkDescription.fromPrimitives(description),
      language,
      cospeakers.map(SpeakerId.fromPrimitives),
      SpeakerId.fromPrimitives(speakerId),
      EventId.fromPrimitives(eventId)
    )
  }

  static proposal(
    id: TalkId,
    title: TalkTitle,
    description: TalkDescription,
    language: Language,
    cospeakers: SpeakerId[],
    speakerId: SpeakerId,
    eventId: EventId
  ) {
    const talk = new Talk(id, title, description, language, cospeakers, speakerId, eventId)

    talk.recordEvent(TalkProposed.emit(id))

    return talk
  }

  private constructor(
    private readonly id: TalkId,
    private readonly title: TalkTitle,
    private readonly description: TalkDescription,
    private readonly language: Language,
    private readonly cospeakers: SpeakerId[],
    private readonly speakerId: SpeakerId,
    private readonly eventId: EventId
  ) {
    super()
    if (cospeakers.length >= 4) throw new MaximumCospeakersReachedError()
  }

  hasStatus(expectedStatus: TalkStatus) {
    return this.getCurrentStatus() === expectedStatus
  }

  private getCurrentStatus() {
    return TalkStatus.PROPOSAL
  }

  getSpeakerId() {
    return this.speakerId
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      title: this.title.toPrimitives(),
      description: this.description.toPrimitives(),
      language: this.language,
      cospeakers: this.cospeakers.map(SpeakerId.toPrimitives),
      status: this.getCurrentStatus(),
      speakerId: this.speakerId.toPrimitives(),
      eventId: this.eventId.toPrimitives(),
    }
  }
}
