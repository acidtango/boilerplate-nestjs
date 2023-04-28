import { Collection, MongoClient } from 'mongodb'
import { Injectable } from '@nestjs/common'
import { TalkRepository } from '../../domain/TalkRepository'
import { Talk, TalkPrimitives } from '../../domain/Talk'
import { TalkId } from '../../../../shared/domain/ids/TalkId'
import { config } from '../../../../config'

@Injectable()
export class TalkRepositoryMongo implements TalkRepository {
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
