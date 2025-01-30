import { Talk } from '../models/Talk.ts'
import { TalkId } from '../../../shared/domain/models/ids/TalkId.ts'

export interface TalkRepository {
  save(talk: Talk): Promise<void>
  findBy(talkId: TalkId): Promise<Talk | undefined>
}
