import { UseCase } from '../../../shared/domain/hex/UseCase'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

export type CreateTalkParams = {
  talkId: TalkId
  reviewerId: OrganizerId
}

export class ReviewTalk extends UseCase {
  constructor(private readonly talkRepository: TalkRepository) {
    super()
  }

  async execute({ talkId, reviewerId }: CreateTalkParams) {
    const talk = await this.talkRepository.findById(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    talk.assignForReviewTo(reviewerId)

    await this.talkRepository.save(talk)
  }
}
