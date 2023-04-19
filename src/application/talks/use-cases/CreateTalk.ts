import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Language } from '../../shared/domain/Language'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkId } from '../domain/TalkId'
import { TalkTitle } from '../domain/TalkTitle'
import { TalkRepository } from '../domain/TalkRepository'
import { Inject } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { Talk } from '../domain/Talk'

export type CreateTalkParams = {
  id: TalkId
  title: TalkTitle
  description: TalkDescription
  cospeakers: string[]
  language: Language
}

export class CreateTalk extends UseCase {
  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute(params: CreateTalkParams) {
    const talk = new Talk(params.id)

    await this.talkRepository.save(talk)
  }
}
