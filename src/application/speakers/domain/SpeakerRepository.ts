import { Speaker } from './Speaker'
import { SpeakerId } from './SpeakerId'

export interface SpeakerRepository {
  save(speaker: Speaker): Promise<void>
  findById(id: SpeakerId): Promise<Speaker | undefined>
}
