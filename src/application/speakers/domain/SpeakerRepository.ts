import { Speaker } from './Speaker'

export interface SpeakerRepository {
  save(speaker: Speaker): Promise<void>
  findById(id: string): Promise<Speaker | undefined>
  exists(id: string): Promise<boolean>
}
