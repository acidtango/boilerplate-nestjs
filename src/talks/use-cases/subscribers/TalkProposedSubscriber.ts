import { Inject, Injectable } from '@nestjs/common'
import { TalkProposed } from '../../domain/events/TalkProposed'
import { DomainEventSubscriber } from '../../../shared/domain/events/DomainEventSubscriber'
import { HandleEvent } from '../../../shared/domain/events/HandleEvent'
import { Token } from '../../../shared/domain/services/Token'
import { EmailSender, ThanksForTheProposal } from '../../../shared/domain/services/EmailSender'
import { TalkRepository } from '../../domain/repositories/TalkRepository'
import { TalkFinder } from '../../domain/services/TalkFinder'
import { SpeakerRepository } from '../../../speakers/domain/repositories/SpeakerRepository'
import { SpeakerFinder } from '../../../speakers/domain/services/SpeakerFinder'

@Injectable()
export class TalkProposedSubscriber extends DomainEventSubscriber<TalkProposed> {
  private readonly talkFinder: TalkFinder

  private readonly speakerFinder: SpeakerFinder

  constructor(
    @Inject(Token.EMAIL_SENDER) private readonly emailSender: EmailSender,
    @Inject(Token.TALK_REPOSITORY) talkRepository: TalkRepository,
    @Inject(Token.SPEAKER_REPOSITORY) speakerRepository: SpeakerRepository
  ) {
    super()
    this.talkFinder = new TalkFinder(talkRepository)
    this.speakerFinder = new SpeakerFinder(speakerRepository)
  }

  @HandleEvent(TalkProposed)
  async on({ talkId }: TalkProposed) {
    const talk = await this.talkFinder.findOrThrowBy(talkId)
    const speaker = await this.speakerFinder.findOrThrowBy(talk.getSpeakerId())

    const email = new ThanksForTheProposal(speaker)

    await this.emailSender.sendThanksForProposal(email)
  }
}
