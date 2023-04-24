import { UseCase } from '../../../shared/domain/hex/UseCase'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { TalkRepository } from '../domain/TalkRepository'
import { Inject, Injectable } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'
import { EventBus } from '../../../shared/domain/hex/EventBus'
import { TalkFinder } from '../domain/TalkFinder'

export type ReviewTalkParams = {
  talkId: TalkId
  reviewerId: OrganizerId
}

@Injectable()
export class ReviewTalk extends UseCase {
  private readonly talkFinder: TalkFinder

  constructor(
    @Inject(AppProvider.EVENT_BUS) private readonly eventBus: EventBus,
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute({ talkId, reviewerId }: ReviewTalkParams) {
    const talk = await this.talkFinder.findOrThrow(talkId)

    talk.ensureTalkIsNotAlreadyBeingReviewed()

    talk.assignForReviewTo(reviewerId)

    await this.talkRepository.save(talk)
    await this.eventBus.publish(talk.pullDomainEvents())
  }
}
