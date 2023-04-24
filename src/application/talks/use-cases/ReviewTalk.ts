import { UseCase } from '../../../shared/domain/hex/UseCase'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { TalkRepository } from '../domain/TalkRepository'

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

    talk?.assignForReviewTo(reviewerId)

    if (talk) await this.talkRepository.save(talk)
  }
}
