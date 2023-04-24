import { UseCase } from '../../../shared/domain/hex/UseCase'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { Inject, Injectable } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { EventBus } from '../../../shared/domain/hex/EventBus'
import { TalkAssignedForReview } from '../domain/TalkAssignedForReview'

export type ReviewTalkParams = {
  talkId: TalkId
  reviewerId: OrganizerId
}

@Injectable()
export class ReviewTalk extends UseCase {
  constructor(
    @Inject(AppProvider.EVENT_BUS) private readonly eventBus: EventBus,
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute({ talkId, reviewerId }: ReviewTalkParams) {
    const talk = await this.talkRepository.findById(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    talk.assignForReviewTo(reviewerId)

    await this.eventBus.publish(new TalkAssignedForReview(talkId, reviewerId))

    await this.talkRepository.save(talk)
  }
}
