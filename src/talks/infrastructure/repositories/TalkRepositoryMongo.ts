import { Collection, MongoClient } from 'mongodb'
import { Injectable } from '@nestjs/common'
import { TalkRepository } from '../../domain/repositories/TalkRepository'
import { Talk, TalkPrimitives } from '../../domain/models/Talk'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { config } from '../../../shared/infrastructure/config'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'

@Injectable()
export class TalkRepositoryMongo implements TalkRepository, Reseteable {
  private readonly talks: Collection<TalkPrimitives>

  constructor(private readonly client: MongoClient) {
    const db = client.db(config.db.database)
    this.talks = db.collection('talks')
  }

  async save(talk: Talk) {
    const primitives = talk.toPrimitives()

    await this.talks.updateOne({ id: primitives.id }, { $set: primitives }, { upsert: true })
  }

  async findBy(talkId: TalkId): Promise<Talk | undefined> {
    const talkPrimitives = await this.talks.findOne({ id: talkId.toPrimitives() })

    if (!talkPrimitives) return undefined

    return Talk.fromPrimitives(talkPrimitives)
  }

  async reset() {
    await this.talks.deleteMany()
  }
}
