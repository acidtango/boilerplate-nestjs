import { type interfaces } from 'inversify'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../shared/infrastructure/config.ts'
import { EventId } from '../../../shared/domain/models/ids/EventId.ts'
import type { EventRepository } from '../../domain/repositories/EventRepository.ts'
import { TalkEvent, type TalkEventPrimitives } from '../../domain/models/TalkEvent.ts'
import type { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable.ts'
import type { Closable } from '../../../shared/infrastructure/repositories/Closable.ts'

export class EventRepositoryMongo implements EventRepository, Reseteable, Closable {
  private readonly talkEvents: Collection<TalkEventPrimitives>
  public readonly client: MongoClient

  public static async create({ container }: interfaces.Context) {
    const client = await container.getAsync(MongoClient)
    console.log('I have the mongo client, creating repo')
    return new EventRepositoryMongo(client)
  }

  constructor(client: MongoClient) {
    console.log('Instantiating repo with client')
    const db = client.db(config.db.database)
    this.talkEvents = db.collection('events')
    this.client = client
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

  async close(): Promise<void> {
    await this.client.close()
  }
}
