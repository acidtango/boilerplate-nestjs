import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { Talk } from '../domain/Talk'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { TalkRepository } from '../domain/TalkRepository'
import { Inject, Injectable } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { TalkFinder } from '../domain/TalkFinder'

@Injectable()
export class GetTalk extends UseCase {
  private readonly talkFinder: TalkFinder

  constructor(@Inject(AppProvider.TALK_REPOSITORY) talkRepository: TalkRepository) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute(talkId: TalkId): Promise<Talk> {
    return this.talkFinder.findOrThrow(talkId)
  }
}
