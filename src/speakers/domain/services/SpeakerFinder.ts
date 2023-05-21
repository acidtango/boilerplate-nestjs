import { SpeakerRepository } from '../repositories/SpeakerRepository'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { SpeakerNotFoundError } from '../errors/SpeakerNotFoundError'
import { DomainService } from '../../../shared/domain/models/hex/DomainService'

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
