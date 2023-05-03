import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Talk } from '../domain/Talk'
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

  async execute(talkId: string): Promise<Talk> {
    return this.talkFinder.findOrThrow(talkId)
  }
}
