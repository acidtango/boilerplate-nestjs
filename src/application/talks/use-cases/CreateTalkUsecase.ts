import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Language } from '../../shared/domain/Language'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkId } from '../domain/TalkId'
import { TalkTitle } from '../domain/TalkTitle'

type CreateTalkUseCaseParams = {
  id: TalkId
  title: TalkTitle
  description: TalkDescription
  cospeakers: string[]
  language: Language
}

export class CreateTalkUseCase extends UseCase {
  async execute(params: CreateTalkUseCaseParams) {
    throw new Error('Unimplemented')
  }
}
