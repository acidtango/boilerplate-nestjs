import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { EventId } from '../../../shared/domain/ids/EventId'
import { AppProvider } from '../../AppProviders'
import { Language } from '../../shared/domain/Language'
import { Talk } from '../domain/Talk'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'
import { EventRepository } from '../../events/domain/EventRepository'

export type CreateTalkParams = {
  id: string
  title: string
  description: string
  cospeakers: string[]
  language: Language
  eventId: EventId
  speakerId: string
}

@Injectable()
export class CreateTalk extends UseCase {
  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository,
    @Inject(AppProvider.EVENT_REPOSITORY) private readonly eventRepository: EventRepository
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
