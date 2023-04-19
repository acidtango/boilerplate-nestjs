import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Language } from '../../shared/domain/Language'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkId } from '../domain/TalkId'
import { TalkTitle } from '../domain/TalkTitle'
import { TalkRepository } from '../domain/TalkRepository'
import { Inject } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { Talk } from '../domain/Talk'
import { EventId } from '../../events/domain/EventId'
import { SpeakerId } from '../../speakers/domain/SpeakerId'
import { TalkStatus } from '../domain/TalkStatus'

export type CreateTalkParams = {
  id: TalkId
  title: TalkTitle
  description: TalkDescription
  cospeakers: string[]
  language: Language
  eventId: EventId
  speakerId: SpeakerId
}

export class CreateTalk extends UseCase {
  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute(params: CreateTalkParams) {
    const { id, cospeakers, description, eventId, language, speakerId, title } = params

    const talk = new Talk(
      id,
      title,
      description,
      language,
      cospeakers,
      TalkStatus.PROPOSAL,
      speakerId,
      eventId
    )

    await this.talkRepository.save(talk)
  }
}
