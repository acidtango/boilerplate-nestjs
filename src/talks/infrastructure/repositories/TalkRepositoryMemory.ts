import { Injectable } from '@nestjs/common'
import { TalkRepository } from '../../domain/repositories/TalkRepository'
import { Talk, TalkPrimitives } from '../../domain/models/Talk'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'

@Injectable()
export class TalkRepositoryMemory implements TalkRepository, Reseteable {
  protected talks: Map<string, TalkPrimitives> = new Map()

  async save(talk: Talk) {
    this.saveSync(talk)
  }

  protected saveSync(talk: Talk) {
    const talkPrimitives = talk.toPrimitives()

    this.talks.set(talkPrimitives.id, talkPrimitives)
  }

  async findBy(talkId: TalkId): Promise<Talk | undefined> {
    const talkPrimitives = this.talks.get(talkId.toPrimitives())

    if (!talkPrimitives) return undefined

    return Talk.fromPrimitives(talkPrimitives)
  }

  async reset() {
    this.talks.clear()
  }
}
