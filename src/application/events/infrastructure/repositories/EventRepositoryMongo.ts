import { Injectable } from '@nestjs/common'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../../config'
import { EventId } from '../../../../shared/domain/ids/EventId'
import { EventRepository } from '../../domain/EventRepository'
import { TalkEvent, TalkEventPrimitives } from '../../domain/TalkEvent'

@Injectable()
export class EventRepositoryMongo implements EventRepository {
  private readonly talkEvents: Collection<TalkEventPrimitives>

  constructor(private readonly client: MongoClient) {
    const db = client.db(config.db.database)
    this.talkEvents = db.collection('events')
  }

  async save(talkEvent: TalkEvent) {
    const primitives = talkEvent.toPrimitives()

    await this.talkEvents.updateOne({ id: primitives.id }, { $set: primitives }, { upsert: true })
  }

  async findAll(): Promise<TalkEvent[]> {
    const talkEventsPrimitives = await this.talkEvents.find().toArray()

    return talkEventsPrimitives.map(TalkEvent.fromPrimitives)
  }

  async exists(id: EventId): Promise<boolean> {
    const exists = Boolean(await this.talkEvents.findOne({ id: id.toPrimitives() }))

    return exists
  }

  async reset() {
    await this.talkEvents.deleteMany()
  }
}
