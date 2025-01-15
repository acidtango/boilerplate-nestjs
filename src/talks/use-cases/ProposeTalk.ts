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

  public static create({ container }: interfaces.Context) {
    return new ProposeTalk(
      container.get<EventBus>(Token.EVENT_BUS),
      container.get<TalkRepository>(Token.TALK_REPOSITORY),
      container.get<EventRepository>(Token.EVENT_REPOSITORY),
      container.get<SpeakerRepository>(Token.SPEAKER_REPOSITORY)
    )
  }

  constructor(
    private readonly eventBus: EventBus,
    private readonly talkRepository: TalkRepository,
    private readonly eventRepository: EventRepository, // TODO: unused
    speakerRepository: SpeakerRepository
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
