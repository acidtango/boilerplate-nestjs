import { Inject, Injectable } from '@nestjs/common'
import { EventBus } from '../../shared/domain/models/hex/EventBus'
import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { OrganizerId } from '../../shared/domain/models/ids/OrganizerId'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { Token } from '../../shared/domain/services/Token'
import { TalkFinder } from '../domain/services/TalkFinder'
import { TalkRepository } from '../domain/repositories/TalkRepository'

export type ReviewTalkParams = {
  talkId: TalkId
  reviewerId: OrganizerId
}

@Injectable()
export class ReviewTalk extends UseCase {
  private readonly talkFinder: TalkFinder

  constructor(
    @Inject(Token.EVENT_BUS) private readonly eventBus: EventBus,
    @Inject(Token.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute({ talkId, reviewerId }: ReviewTalkParams) {
    const talk = await this.talkFinder.findOrThrowBy(talkId)

    talk.assignForReviewTo(reviewerId)

    await this.talkRepository.save(talk)
    await this.eventBus.publish(talk.pullDomainEvents())
  }
}
