import { UseCase } from '../../shared/domain/models/hex/UseCase'
import { Language } from '../../shared/domain/models/Language'
import { SpeakerAge } from '../domain/SpeakerAge'
import { SpeakerName } from '../domain/SpeakerName'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { EventBusFake } from '../../../test/fakes/EventBusFake'
import { SpeakerRepository } from '../domain/SpeakerRepository'
import { SpeakerFinder } from '../domain/services/SpeakerFinder'
import { Inject, Injectable } from '@nestjs/common'
import { Token } from '../../shared/domain/services/Token'

export type UpdateSpeakerProfileParams = {
  id: SpeakerId
  name: SpeakerName
  age: SpeakerAge
  language: Language
}

@Injectable()
export class UpdateSpeakerProfile extends UseCase {
  private readonly speakerFinder: SpeakerFinder

  constructor(
    @Inject(Token.SPEAKER_REPOSITORY)
    private readonly speakerRepository: SpeakerRepository,
    @Inject(Token.EVENT_BUS)
    private readonly eventBus: EventBusFake
  ) {
    super()
    this.speakerFinder = new SpeakerFinder(speakerRepository)
  }

  async execute({ id, name, age, language }: UpdateSpeakerProfileParams) {
    const speaker = await this.speakerFinder.findOrThrowBy(id)

    speaker.updateProfile(name, age, language)

    await this.speakerRepository.save(speaker)
    await this.eventBus.publish(speaker.pullDomainEvents())
  }
}
