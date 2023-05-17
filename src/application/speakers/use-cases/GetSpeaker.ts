import { Speaker } from '../domain/Speaker'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'
import { SpeakerRepository } from '../domain/SpeakerRepository'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'
import { Inject, Injectable } from '@nestjs/common'
import { AppProvider } from '../../AppProviders'

@Injectable()
export class GetSpeaker {
  constructor(
    @Inject(AppProvider.SPEAKER_REPOSITORY) private readonly speakerRepository: SpeakerRepository
  ) {}

  async execute(speakerId: SpeakerId): Promise<Speaker> {
    const speaker = await this.speakerRepository.findById(speakerId)

    if (!speaker) throw new SpeakerNotFoundError(speakerId)

    return speaker
  }
}
