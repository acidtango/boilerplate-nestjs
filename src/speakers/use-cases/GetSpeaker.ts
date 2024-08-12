import type { interfaces } from 'inversify'
import { Speaker } from '../domain/models/Speaker.ts'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId.ts'
import type { SpeakerRepository } from '../domain/repositories/SpeakerRepository.ts'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError.ts'
import { Token } from '../../shared/domain/services/Token.ts'

export class GetSpeaker {
  private readonly speakerRepository: SpeakerRepository

  public static create({ container }: interfaces.Context) {
    return new GetSpeaker(container.get<SpeakerRepository>(Token.SPEAKER_REPOSITORY))
  }

  constructor(speakerRepository: SpeakerRepository) {
    this.speakerRepository = speakerRepository
  }

  async execute(speakerId: SpeakerId): Promise<Speaker> {
    const speaker = await this.speakerRepository.findById(speakerId)

    if (!speaker) throw new SpeakerNotFoundError(speakerId)

    return speaker
  }
}
