import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { EventId } from '../../shared/domain/models/ids/EventId'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { Token } from '../../shared/domain/services/Token'
import { Language } from '../../shared/domain/models/Language'
import { Talk } from '../domain/models/Talk'
import { TalkDescription } from '../domain/models/TalkDescription'
import { TalkRepository } from '../domain/repositories/TalkRepository'
import { TalkTitle } from '../domain/models/TalkTitle'
import { EventRepository } from '../../events/domain/repositories/EventRepository'
import { SpeakerRepository } from '../../speakers/domain/repositories/SpeakerRepository'
import { SpeakerFinder } from '../../speakers/domain/services/SpeakerFinder'
import { EventFinder } from '../../events/domain/services/EventFinder'
import { EventBus } from '../../shared/domain/models/hex/EventBus'

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
    @Inject(Token.EVENT_BUS) private readonly eventBus: EventBus,
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
    await this.eventBus.publish(talk.pullDomainEvents())
  }
}
