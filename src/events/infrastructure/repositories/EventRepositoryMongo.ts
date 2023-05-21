import { Injectable } from '@nestjs/common'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../shared/infrastructure/config'
import { EventId } from '../../../shared/domain/models/ids/EventId'
import { EventRepository } from '../../domain/repositories/EventRepository'
import { TalkEvent, TalkEventPrimitives } from '../../domain/models/TalkEvent'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'

@Injectable()
export class EventRepositoryMongo implements EventRepository, Reseteable {
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
    return Boolean(await this.talkEvents.findOne({ id: id.toPrimitives() }))
  }

  async reset() {
    await this.talkEvents.deleteMany()
  }
}
