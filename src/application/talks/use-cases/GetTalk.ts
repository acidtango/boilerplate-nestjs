import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Talk } from '../domain/Talk'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { TalkRepository } from '../domain/TalkRepository'
import { Inject } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

export class GetTalk extends UseCase {
  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute(talkId: TalkId): Promise<Talk> {
    const talk = await this.talkRepository.findById(talkId)

    if (!talk) throw new TalkNotFoundError(talkId)

    return talk
  }
}
