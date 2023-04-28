import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Talk } from '../domain/Talk'
import { TalkRepository } from '../domain/TalkRepository'
import { Inject, Injectable } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

@Injectable()
export class GetTalk extends UseCase {
  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute(talkId: string): Promise<Talk> {
    const talk = await this.talkRepository.findBy(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    return talk
  }
}
