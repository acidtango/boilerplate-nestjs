import { Speaker } from './Speaker'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'

export interface SpeakerRepository {
  save(speaker: Speaker): Promise<void>
  findById(id: SpeakerId): Promise<Speaker | undefined>
  exists(id: SpeakerId): Promise<boolean>
}
