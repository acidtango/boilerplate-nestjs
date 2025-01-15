import { UseCase } from '../../shared/domain/models/hex/UseCase.ts'
import { TalkId } from '../../shared/domain/models/ids/TalkId.ts'
import type { TalkRepository } from '../domain/repositories/TalkRepository.ts'
import { TalkFinder } from '../domain/services/TalkFinder.ts'
import type { interfaces } from 'inversify'
import { Token } from '../../shared/domain/services/Token.ts'

export class ApproveTalk extends UseCase {
  private readonly talkFinder: TalkFinder

  public static create({ container }: interfaces.Context) {
    return new ApproveTalk(container.get(Token.TALK_REPOSITORY))
  }

  constructor(private readonly talkRepository: TalkRepository) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute(talkId: TalkId) {
    const talk = await this.talkFinder.findOrThrowBy(talkId)

    talk.approve()

    await this.talkRepository.save(talk)
  }
}
