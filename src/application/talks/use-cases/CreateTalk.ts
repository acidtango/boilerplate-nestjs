import { Inject } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { EventId } from '../../../shared/domain/ids/EventId'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { AppProvider } from '../../AppProviders'
import { Language } from '../../shared/domain/Language'
import { Talk } from '../domain/Talk'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkTitle } from '../domain/TalkTitle'

export type CreateTalkParams = {
  id: TalkId
  title: TalkTitle
  description: TalkDescription
  cospeakers: SpeakerId[]
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

    const talk = Talk.create(id, title, description, language, cospeakers, speakerId, eventId)

    await this.talkRepository.save(talk)
  }
}
