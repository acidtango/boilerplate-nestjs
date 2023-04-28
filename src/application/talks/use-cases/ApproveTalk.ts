import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { AppProvider } from '../../AppProviders'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkFinder } from '../domain/TalkFinder'
import { TalkStatus } from '../domain/TalkStatus'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'

@Injectable()
export class ApproveTalk extends UseCase {
  private readonly talkFinder: TalkFinder

  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute(talkId: string) {
    const talk = await this.talkFinder.findOrThrow(talkId)

    if (talk.getCurrentStatus() === TalkStatus.PROPOSAL) throw new TalkCannotBeApprovedError()

    talk.setIsApproved(true)

    await this.talkRepository.save(talk)
  }
}
