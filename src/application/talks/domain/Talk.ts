import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { Primitives } from '../../../utils/Primitives'
import { Language } from '../../shared/domain/Language'
import { TalkAssignedForReview } from './TalkAssignedForReview'
import { TalkStatus } from './TalkStatus'
import { MaximumCospeakersReachedError } from './errors/MaximumCospeakersReachedError'
import { TalkAlreadyBeingReviewed } from './errors/TalkAlreadyBeingReviewed'
import { TalkCannotBeApprovedError } from './errors/TalkCannotBeApprovedError'
import { TalkTitleTooLongError } from './errors/TalkTitleTooLongError'
import { TalkDescriptionTooLongError } from './errors/TalkDescriptionTooLongError'

export type TalkPrimitives = Primitives<Talk>

export class Talk extends AggregateRoot {
  private static readonly MAX_TITLE_LENGTH = 100

  private static readonly MAX_DESCRIPTION_LENGTH = 300

  private constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly description: string,
    private readonly language: Language,
    private readonly cospeakers: string[],
    private readonly speakerId: string,
    private readonly eventId: string,
    private reviewerId?: string,
    private isApproved?: boolean
  ) {
    super()
    if (cospeakers.length >= 4) throw new MaximumCospeakersReachedError()
    if (this.title.length > Talk.MAX_TITLE_LENGTH) {
      throw new TalkTitleTooLongError()
    }
    if (this.description.length > Talk.MAX_DESCRIPTION_LENGTH) {
      throw new TalkDescriptionTooLongError()
    }
  }

  static create(
    id: string,
    title: string,
    description: string,
    language: Language,
    cospeakers: string[],
    speakerId: string,
    eventId: string
  ) {
    return new Talk(id, title, description, language, cospeakers, speakerId, eventId)
  }

  assignReviewer(id: string) {
    this.reviewerId = id
  }

  static fromPrimitives(talkPrimitives: TalkPrimitives) {
    const {
      id,
      cospeakers,
      description,
      eventId,
      language,
      speakerId,
      title,
      reviewerId,
      isApproved,
    } = talkPrimitives

    return new Talk(
      id,
      title,
      description,
      language,
      cospeakers,
      speakerId,
      eventId,
      reviewerId ? reviewerId : undefined,
      typeof isApproved === 'boolean' ? isApproved : undefined
    )
  }

  hasStatus(expectedStatus: TalkStatus) {
    return this.getCurrentStatus() === expectedStatus
  }

  assignForReviewTo(reviewerId: string) {
    this.ensureTalkIsNotAlreadyBeingReviewed()

    this.reviewerId = reviewerId
    this.recordEvent(new TalkAssignedForReview(this.id, reviewerId))
  }

  isGoingToBeReviewedBy(expectedReviewerId: string) {
    return this.reviewerId === expectedReviewerId
  }

  ensureTalkIsNotAlreadyBeingReviewed() {
    if (this.hasStatus(TalkStatus.REVIEWING)) {
      throw new TalkAlreadyBeingReviewed(this.id)
    }
  }

  private getCurrentStatus() {
    if (this.isApproved) return TalkStatus.APPROVED
    if (this.isApproved === false) return TalkStatus.REJECTED
    if (this.reviewerId) return TalkStatus.REVIEWING

    return TalkStatus.PROPOSAL
  }

  approve() {
    if (this.hasStatus(TalkStatus.PROPOSAL)) throw new TalkCannotBeApprovedError()

    this.isApproved = true
  }

  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      language: this.language,
      cospeakers: this.cospeakers,
      status: this.getCurrentStatus(),
      speakerId: this.speakerId,
      reviewerId: this.reviewerId,
      eventId: this.eventId,
      isApproved: this.isApproved,
    }
  }
}
