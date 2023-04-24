import { Injectable } from '@nestjs/common'
import { TalkRepository } from '../../domain/TalkRepository'
import { Talk, TalkPrimitives } from '../../domain/Talk'
import { TalkId } from '../../../../shared/domain/ids/TalkId'

@Injectable()
export class TalkRepositoryMemory implements TalkRepository {
  protected talks: Map<string, TalkPrimitives> = new Map()

  async save(talk: Talk) {
    this.saveSync(talk)
  }

  protected saveSync(talk: Talk) {
    const talkPrimitives = talk.toPrimitives()

    this.talks.set(talkPrimitives.id, talkPrimitives)
  }

  async findById(talkId: TalkId): Promise<Talk | undefined> {
    const talkPrimitives = this.talks.get(talkId.toPrimitives())

    if (!talkPrimitives) return undefined

    return Talk.fromPrimitives(talkPrimitives)
  }
}
