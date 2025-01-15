import type { interfaces } from 'inversify'
import { Collection, MongoClient } from 'mongodb'
import type { TalkRepository } from '../../domain/repositories/TalkRepository.ts'
import { Talk, type TalkPrimitives } from '../../domain/models/Talk.ts'
import { TalkId } from '../../../shared/domain/models/ids/TalkId.ts'
import { config } from '../../../shared/infrastructure/config.ts'
import type { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable.ts'
import type { Closable } from '../../../shared/infrastructure/repositories/Closable.ts'

export class TalkRepositoryMongo implements TalkRepository, Reseteable, Closable {
  public static async create({ container }: interfaces.Context) {
    const client = await container.getAsync(MongoClient)
    console.log('I have the mongo client, creating repo')
    return new TalkRepositoryMongo(client)
  }

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

  async close(): Promise<void> {
    await this.client.close()
  }
}
