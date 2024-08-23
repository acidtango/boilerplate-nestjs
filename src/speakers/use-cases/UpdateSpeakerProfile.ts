import type { interfaces } from 'inversify'
import { UseCase } from '../../shared/domain/models/hex/UseCase.ts'
import { Language } from '../../shared/domain/models/Language.ts'
import { SpeakerAge } from '../domain/models/SpeakerAge.ts'
import { SpeakerName } from '../domain/models/SpeakerName.ts'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId.ts'
import type { SpeakerRepository } from '../domain/repositories/SpeakerRepository.ts'
import { SpeakerFinder } from '../domain/services/SpeakerFinder.ts'
import { Token } from '../../shared/domain/services/Token.ts'
import type { EventBus } from '../../shared/domain/models/hex/EventBus.ts'

export type UpdateSpeakerProfileParams = {
  id: SpeakerId
  name: SpeakerName
  age: SpeakerAge
  language: Language
}

export class UpdateSpeakerProfile extends UseCase {
  public static create({ container }: interfaces.Context) {
    return new UpdateSpeakerProfile(
      container.get<SpeakerRepository>(Token.SPEAKER_REPOSITORY),
      container.get<EventBus>(Token.EVENT_BUS)
    )
  }

  private readonly speakerFinder: SpeakerFinder

  constructor(
    private readonly speakerRepository: SpeakerRepository,
    private readonly eventBus: EventBus
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
