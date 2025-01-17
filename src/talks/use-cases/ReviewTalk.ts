import type { interfaces } from 'inversify'
import type { EventBus } from '../../shared/domain/models/hex/EventBus.ts'
import { UseCase } from '../../shared/domain/models/hex/UseCase.ts'
import { OrganizerId } from '../../shared/domain/models/ids/OrganizerId.ts'
import { TalkId } from '../../shared/domain/models/ids/TalkId.ts'
import { Token } from '../../shared/domain/services/Token.ts'
import { TalkFinder } from '../domain/services/TalkFinder.ts'
import type { TalkRepository } from '../domain/repositories/TalkRepository.ts'

export type ReviewTalkParams = {
  talkId: TalkId
  reviewerId: OrganizerId
}

export class ReviewTalk extends UseCase {
  private readonly talkFinder: TalkFinder
  private readonly eventBus: EventBus
  private readonly talkRepository: TalkRepository

  public static create({ container }: interfaces.Context) {
    return new ReviewTalk(
      container.get<EventBus>(Token.EVENT_BUS),
      container.get<TalkRepository>(Token.TALK_REPOSITORY)
    )
  }

  constructor(eventBus: EventBus, talkRepository: TalkRepository) {
    super()
    this.eventBus = eventBus
    this.talkRepository = talkRepository
    this.talkFinder = new TalkFinder(talkRepository)
  }

  async execute({ talkId, reviewerId }: ReviewTalkParams) {
    const talk = await this.talkFinder.findOrThrowBy(talkId)

    talk.assignForReviewTo(reviewerId)

    await this.talkRepository.save(talk)
    await this.eventBus.publish(talk.pullDomainEvents())
  }
}
