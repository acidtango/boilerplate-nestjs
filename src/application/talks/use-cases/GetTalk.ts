import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Talk } from '../domain/Talk'
import { Injectable } from '@nestjs/common'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../config'

@Injectable()
export class GetTalk extends UseCase {
  private readonly talks: Collection<Talk>

  constructor(private readonly client: MongoClient) {
    super()
    const db = client.db(config.db.database)
    this.talks = db.collection('talks')
  }

  async execute(talkId: string): Promise<Talk> {
    const talk = await this.talks.findOne({ id: talkId })

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    return talk
  }
}
