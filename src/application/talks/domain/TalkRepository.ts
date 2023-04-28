import { Talk } from './Talk'

export interface TalkRepository {
  save(talk: Talk): Promise<void>
  findBy(talkId: string): Promise<Talk | undefined>
}
