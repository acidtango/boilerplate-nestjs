import { Speaker } from './Speaker'
import { SpeakerId } from './SpeakerId'

export interface SpeakerRepository {
  findById(id: SpeakerId): Promise<Speaker | undefined>
}
