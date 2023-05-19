import { Speaker } from './Speaker'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'
import { EmailAddress } from '../../shared/domain/EmailAddress'

export interface SpeakerRepository {
  save(speaker: Speaker): Promise<void>
  findById(id: SpeakerId): Promise<Speaker | undefined>
  exists(id: SpeakerId): Promise<boolean>
  existsWith(email: EmailAddress): Promise<boolean>
}
