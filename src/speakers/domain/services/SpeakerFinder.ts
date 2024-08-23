import type { SpeakerRepository } from '../repositories/SpeakerRepository.ts'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId.ts'
import { SpeakerNotFoundError } from '../errors/SpeakerNotFoundError.ts'
import { DomainService } from '../../../shared/domain/models/hex/DomainService.ts'

export class SpeakerFinder extends DomainService {
  constructor(private readonly speakerRepository: SpeakerRepository) {
    super()
  }

  async findOrThrowBy(id: SpeakerId) {
    const speaker = await this.speakerRepository.findById(id)

    if (!speaker) {
      throw new SpeakerNotFoundError(id)
    }

    return speaker
  }
}
