import { Speaker } from '../domain/models/Speaker'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { SpeakerRepository } from '../domain/repositories/SpeakerRepository'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'
import { Inject, Injectable } from '@nestjs/common'
import { Token } from '../../shared/domain/services/Token'

@Injectable()
export class GetSpeaker {
  constructor(
    @Inject(Token.SPEAKER_REPOSITORY) private readonly speakerRepository: SpeakerRepository
  ) {}

  async execute(speakerId: SpeakerId): Promise<Speaker> {
    const speaker = await this.speakerRepository.findById(speakerId)

    if (!speaker) throw new SpeakerNotFoundError(speakerId)

    return speaker
  }
}
