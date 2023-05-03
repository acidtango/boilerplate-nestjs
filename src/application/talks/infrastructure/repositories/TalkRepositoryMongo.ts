import { Collection, MongoClient } from 'mongodb'
import { Injectable } from '@nestjs/common'
import { TalkRepository } from '../../domain/TalkRepository'
import { Talk, TalkPrimitives } from '../../domain/Talk'
import { config } from '../../../../config'
import { Reseteable } from '../../../../shared/infrastructure/repositories/Reseteable'

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

  async findBy(talkId: string): Promise<Talk | undefined> {
    const talkPrimitives = await this.talks.findOne({ id: talkId })

    if (!talkPrimitives) return undefined

    return Talk.fromPrimitives(talkPrimitives)
  }

  async reset() {
    await this.talks.deleteMany()
  }
}
