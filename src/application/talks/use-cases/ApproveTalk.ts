import { Inject } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { AppProvider } from '../../AppProviders'
import { TalkRepository } from '../domain/TalkRepository'

export class ApproveTalk extends UseCase {
  constructor(
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute(talkId: TalkId) {
    const talk = await this.talkRepository.findById(talkId)

    if (!talk) throw new Error('Not found')

    talk.approve()

    await this.talkRepository.save(talk)
  }
}
