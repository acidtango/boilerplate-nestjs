import { Collection, MongoClient } from 'mongodb'
import { Injectable } from '@nestjs/common'
import { TalkRepository } from '../../domain/TalkRepository'
import { Talk } from '../../domain/Talk'
import { config } from '../../../../config'
import { Reseteable } from '../../../../shared/infrastructure/repositories/Reseteable'

@Injectable()
export class TalkRepositoryMongo implements TalkRepository, Reseteable {
  private readonly talks: Collection<Talk>

  constructor(private readonly client: MongoClient) {
    const db = client.db(config.db.database)
    this.talks = db.collection('talks')
  }

  async reset() {
    await this.talks.deleteMany()
  }

  async findBy(talkId: string): Promise<Talk | undefined> {
    const document = await this.talks.findOne({ id: talkId })

    if (!document) return undefined

    const { _id, ...talkPrimitives } = document

    return talkPrimitives
  }

  async save(talk: Talk): Promise<void> {
    await this.talks.updateOne({ id: talk.id }, { $set: talk }, { upsert: true })
  }
}
