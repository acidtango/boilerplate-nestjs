import type { interfaces } from 'inversify'
import { UseCase } from '../../shared/domain/models/hex/UseCase.ts'
import { EventId } from '../../shared/domain/models/ids/EventId.ts'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId.ts'
import { TalkId } from '../../shared/domain/models/ids/TalkId.ts'
import { Token } from '../../shared/domain/services/Token.ts'
import { Language } from '../../shared/domain/models/Language.ts'
import { Talk } from '../domain/models/Talk.ts'
import { TalkDescription } from '../domain/models/TalkDescription.ts'
import type { TalkRepository } from '../domain/repositories/TalkRepository.ts'
import { TalkTitle } from '../domain/models/TalkTitle.ts'
import type { EventRepository } from '../../events/domain/repositories/EventRepository.ts'
import type { SpeakerRepository } from '../../speakers/domain/repositories/SpeakerRepository.ts'
import { SpeakerFinder } from '../../speakers/domain/services/SpeakerFinder.ts'
import { EventFinder } from '../../events/domain/services/EventFinder.ts'
import type { EventBus } from '../../shared/domain/models/hex/EventBus.ts'

export type ProposeTalkParams = {
  id: TalkId
  title: TalkTitle
  description: TalkDescription
  cospeakers: SpeakerId[]
  language: Language
  eventId: EventId
  speakerId: SpeakerId
}

export class ProposeTalk extends UseCase {
  private readonly speakerFinder: SpeakerFinder

  private readonly eventFinder: EventFinder

  private readonly eventBus: EventBus

  private readonly talkRepository: TalkRepository

  public static async create({ container }: interfaces.Context) {
    return new ProposeTalk(
      ...(await Promise.all([
        container.get<EventBus>(Token.EVENT_BUS),
        container.getAsync<TalkRepository>(Token.TALK_REPOSITORY),
        container.getAsync<EventRepository>(Token.EVENT_REPOSITORY),
        container.getAsync<SpeakerRepository>(Token.SPEAKER_REPOSITORY),
      ]))
    )
  }

  constructor(
    eventBus: EventBus,
    talkRepository: TalkRepository,
    eventRepository: EventRepository,
    speakerRepository: SpeakerRepository
  ) {
    super()
    this.eventBus = eventBus
    this.talkRepository = talkRepository
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
