import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { EventId } from '../../../shared/domain/ids/EventId'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'
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
    private readonly id: TalkId,
    private readonly title: string,
    private readonly description: string,
    private readonly language: Language,
    private readonly cospeakers: SpeakerId[],
    private readonly speakerId: SpeakerId,
    private readonly eventId: EventId,
    private reviewerId?: OrganizerId,
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
    id: TalkId,
    title: string,
    description: string,
    language: Language,
    cospeakers: SpeakerId[],
    speakerId: SpeakerId,
    eventId: EventId
  ) {
    return new Talk(id, title, description, language, cospeakers, speakerId, eventId)
  }

  assignReviewer(id: OrganizerId) {
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
      TalkId.fromPrimitives(id),
      title,
      description,
      language,
      cospeakers.map(SpeakerId.fromPrimitives),
      SpeakerId.fromPrimitives(speakerId),
      EventId.fromPrimitives(eventId),
      reviewerId ? OrganizerId.fromPrimitives(reviewerId) : undefined,
      typeof isApproved === 'boolean' ? isApproved : undefined
    )
  }

  hasStatus(expectedStatus: TalkStatus) {
    return this.getCurrentStatus() === expectedStatus
  }

  assignForReviewTo(reviewerId: OrganizerId) {
    this.ensureTalkIsNotAlreadyBeingReviewed()

    this.assignReviewer(reviewerId)
    this.recordEvent(new TalkAssignedForReview(this.id, reviewerId))
  }

  isGoingToBeReviewedBy(expectedReviewerId: OrganizerId) {
    return this.reviewerId?.equals(expectedReviewerId) ?? false
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
      id: this.id.toPrimitives(),
      title: this.title,
      description: this.description,
      language: this.language,
      cospeakers: this.cospeakers.map(SpeakerId.toPrimitives),
      status: this.getCurrentStatus(),
      speakerId: this.speakerId.toPrimitives(),
      reviewerId: this.reviewerId?.toPrimitives(),
      eventId: this.eventId.toPrimitives(),
      isApproved: this.isApproved,
    }
  }
}
