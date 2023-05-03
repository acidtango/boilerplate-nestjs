import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { AppProvider } from '../../AppProviders'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkStatus } from '../domain/TalkStatus'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'
import { Talk } from '../domain/Talk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

@Injectable()
export class ApproveTalk extends UseCase {
  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute(talkId: string) {
    const talk = await this.talkRepository.findBy(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    if (this.getCurrentStatus(talk) === TalkStatus.PROPOSAL) throw new TalkCannotBeApprovedError()

    talk.isApproved = true

    await this.talkRepository.save(talk)
  }

  private getCurrentStatus(talk: Talk) {
    if (talk.isApproved) {
      return TalkStatus.APPROVED
    } else if (talk.isApproved === false) {
      return TalkStatus.REJECTED
    } else if (talk.reviewerId) {
      return TalkStatus.REVIEWING
    } else {
      return TalkStatus.PROPOSAL
    }
  }
}
