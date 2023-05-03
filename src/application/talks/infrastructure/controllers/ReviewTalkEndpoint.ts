import { Body, Controller, HttpStatus, Inject, Param, Put } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { ReviewTalkRequestDTO } from './dtos/ReviewTalkRequestDTO'
import { AppProvider } from '../../../AppProviders'
import { EventBus } from '../../../../shared/domain/hex/EventBus'
import { TalkRepository } from '../../domain/TalkRepository'
import { TalkNotFoundError } from '../../domain/errors/TalkNotFoundError'
import { TalkStatus } from '../../domain/TalkStatus'
import { TalkAlreadyBeingReviewed } from '../../domain/errors/TalkAlreadyBeingReviewed'
import { TalkAssignedForReview } from '../../domain/TalkAssignedForReview'
import { Talk } from '../../domain/Talk'

@Controller('/v1/talks/:id/assignation')
export class ReviewTalkEndpoint {
  constructor(
    @Inject(AppProvider.EVENT_BUS) private readonly eventBus: EventBus,
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Assigns a talk to a reviewer',
    status: HttpStatus.OK,
  })
  @Put()
  async execute(@Param('id') id: string, @Body() body: ReviewTalkRequestDTO) {
    const talk = await this.talkRepository.findBy(id)

    if (!talk) {
      throw new TalkNotFoundError(id)
    }

    if (this.getCurrentStatus(talk) === TalkStatus.REVIEWING) {
      throw new TalkAlreadyBeingReviewed(talk.id)
    }

    talk.reviewerId = body.reviewerId

    await this.talkRepository.save(talk)
    await this.eventBus.publish([new TalkAssignedForReview(talk.id, body.reviewerId)])
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
