import { Body, Controller, HttpStatus, Inject, Param, Put } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { ReviewTalkRequestDTO } from './dtos/ReviewTalkRequestDTO'
import { AppProvider } from '../../../AppProviders'
import { EventBus } from '../../../../shared/domain/hex/EventBus'
import { TalkNotFoundError } from '../../domain/errors/TalkNotFoundError'
import { TalkStatus } from '../../domain/TalkStatus'
import { TalkAlreadyBeingReviewed } from '../../domain/errors/TalkAlreadyBeingReviewed'
import { TalkAssignedForReview } from '../../domain/TalkAssignedForReview'
import { Talk } from '../../domain/Talk'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../../config'

@Controller('/v1/talks/:id/assignation')
export class ReviewTalkEndpoint {
  private readonly talks: Collection<Talk>

  constructor(
    @Inject(AppProvider.EVENT_BUS) private readonly eventBus: EventBus,
    private readonly client: MongoClient
  ) {
    const db = client.db(config.db.database)
    this.talks = db.collection('talks')
  }

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Assigns a talk to a reviewer',
    status: HttpStatus.OK,
  })
  @Put()
  async execute(@Param('id') id: string, @Body() body: ReviewTalkRequestDTO) {
    const talk = await this.talks.findOne({ id })

    if (!talk) {
      throw new TalkNotFoundError(id)
    }

    if (this.getCurrentStatus(talk) === TalkStatus.REVIEWING) {
      throw new TalkAlreadyBeingReviewed(talk.id)
    }

    talk.reviewerId = body.reviewerId

    await this.talks.updateOne({ id: talk.id }, { $set: talk }, { upsert: true })
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
