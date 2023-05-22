import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { Token } from '../../shared/domain/services/Token'
import { TalkRepository } from '../domain/repositories/TalkRepository'
import { TalkFinder } from '../domain/services/TalkFinder'

@Injectable()
export class ApproveTalk extends UseCase {
  private readonly talkFinder: TalkFinder

  constructor(@Inject(Token.TALK_REPOSITORY) private readonly talkRepository: TalkRepository) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute(talkId: TalkId) {
    const talk = await this.talkFinder.findOrThrowBy(talkId)

    talk.approve()

    await this.talkRepository.save(talk)
  }
}
