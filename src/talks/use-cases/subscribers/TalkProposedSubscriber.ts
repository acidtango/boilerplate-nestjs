import type { interfaces } from 'inversify'
import { TalkProposed } from '../../domain/events/TalkProposed.ts'
import { DomainEventSubscriber } from '../../../shared/domain/events/DomainEventSubscriber.ts'
import { Token } from '../../../shared/domain/services/Token.ts'
import {
  type EmailSender,
  ThanksForTheProposal,
} from '../../../shared/domain/services/EmailSender.ts'
import type { TalkRepository } from '../../domain/repositories/TalkRepository.ts'
import { TalkFinder } from '../../domain/services/TalkFinder.ts'
import type { SpeakerRepository } from '../../../speakers/domain/repositories/SpeakerRepository.ts'
import { SpeakerFinder } from '../../../speakers/domain/services/SpeakerFinder.ts'
import type { DomainEvent } from '../../../shared/domain/events/DomainEvent.js'

export class TalkProposedSubscriber extends DomainEventSubscriber<TalkProposed> {
  private readonly talkFinder: TalkFinder

  private readonly speakerFinder: SpeakerFinder

  public static create({ container }: interfaces.Context) {
    return new TalkProposedSubscriber(
      container.get(Token.EMAIL_SENDER),
      container.get(Token.TALK_REPOSITORY),
      container.get(Token.SPEAKER_REPOSITORY)
    )
  }

  constructor(
    private readonly emailSender: EmailSender,
    talkRepository: TalkRepository,
    speakerRepository: SpeakerRepository
  ) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
    this.speakerFinder = new SpeakerFinder(speakerRepository)
  }

  canHandle(domainEvent: DomainEvent): boolean {
    return domainEvent instanceof TalkProposed
  }

  async on({ talkId }: TalkProposed) {
    const talk = await this.talkFinder.findOrThrowBy(talkId)
    const speaker = await this.speakerFinder.findOrThrowBy(talk.getSpeakerId())

    const email = new ThanksForTheProposal(speaker)

    await this.emailSender.sendThanksForProposal(email)
  }
}
