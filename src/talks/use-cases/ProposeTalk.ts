import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { EventId } from '../../shared/domain/models/ids/EventId'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { Token } from '../../shared/domain/services/Token'
import { Language } from '../../shared/domain/models/Language'
import { Talk } from '../domain/Talk'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkTitle } from '../domain/TalkTitle'
import { EventRepository } from '../../events/domain/EventRepository'
import { SpeakerRepository } from '../../speakers/domain/SpeakerRepository'
import { SpeakerFinder } from '../../speakers/domain/services/SpeakerFinder'
import { EventFinder } from '../../events/domain/services/EventFinder'

export type ProposeTalkParams = {
  id: TalkId
  title: TalkTitle
  description: TalkDescription
  cospeakers: SpeakerId[]
  language: Language
  eventId: EventId
  speakerId: SpeakerId
}

@Injectable()
export class ProposeTalk extends UseCase {
  private readonly speakerFinder: SpeakerFinder

  private readonly eventFinder: EventFinder

  constructor(
    @Inject(Token.TALK_REPOSITORY) private readonly talkRepository: TalkRepository,
    @Inject(Token.EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    @Inject(Token.SPEAKER_REPOSITORY) speakerRepository: SpeakerRepository
  ) {
    super()
    this.speakerFinder = new SpeakerFinder(speakerRepository)
    this.eventFinder = new EventFinder(eventRepository)
  }

  async execute({
    cospeakers,
    description,
    eventId,
    id,
    language,
    speakerId,
    title,
  }: ProposeTalkParams) {
    const speaker = await this.speakerFinder.findOrThrowBy(speakerId)

    speaker.ensureHasProfileFilled()
    await this.eventFinder.ensureExists(eventId)

    const talk = Talk.proposal(id, title, description, language, cospeakers, speakerId, eventId)

    await this.talkRepository.save(talk)
  }
}
