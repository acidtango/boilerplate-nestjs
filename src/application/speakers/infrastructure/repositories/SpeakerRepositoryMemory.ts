import { SpeakerRepository } from '../../domain/SpeakerRepository'
import { SpeakerId } from '../../domain/SpeakerId'
import { Speaker } from '../../domain/Speaker'

export class SpeakerRepositoryMemory implements SpeakerRepository {
  findById(id: SpeakerId): Promise<Speaker | undefined> {
    return Promise.resolve(undefined)
  }
}
