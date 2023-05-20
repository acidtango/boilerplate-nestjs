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
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'
import { EventRepository } from '../../events/domain/EventRepository'

export type CreateTalkParams = {
  id: TalkId
  title: TalkTitle
  description: TalkDescription
  cospeakers: SpeakerId[]
  language: Language
  eventId: EventId
  speakerId: SpeakerId
}

@Injectable()
export class CreateTalk extends UseCase {
  constructor(
    @Inject(Token.TALK_REPOSITORY) private readonly talkRepository: TalkRepository,
    @Inject(Token.EVENT_REPOSITORY) private readonly eventRepository: EventRepository
  ) {
    super()
  }

  async execute({
    cospeakers,
    description,
    eventId,
    id,
    language,
    speakerId,
    title,
  }: CreateTalkParams) {
    if (!(await this.eventRepository.exists(eventId))) {
      throw new TalkEventNotFoundError(eventId)
    }

    const talk = Talk.create(id, title, description, language, cospeakers, speakerId, eventId)

    await this.talkRepository.save(talk)
  }
}