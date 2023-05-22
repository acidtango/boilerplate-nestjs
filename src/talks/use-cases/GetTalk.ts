import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { Talk } from '../domain/models/Talk'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { TalkRepository } from '../domain/repositories/TalkRepository'
import { Inject, Injectable } from '@nestjs/common'
import { Token } from '../../shared/domain/services/Token'
import { TalkFinder } from '../domain/services/TalkFinder'

@Injectable()
export class GetTalk extends UseCase {
  private readonly talkFinder: TalkFinder

  constructor(@Inject(Token.TALK_REPOSITORY) talkRepository: TalkRepository) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute(talkId: TalkId): Promise<Talk> {
    return this.talkFinder.findOrThrowBy(talkId)
  }
}
