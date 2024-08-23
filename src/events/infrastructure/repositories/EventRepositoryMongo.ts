import type { interfaces } from 'inversify'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../shared/infrastructure/config.ts'
import { EventId } from '../../../shared/domain/models/ids/EventId.ts'
import type { EventRepository } from '../../domain/repositories/EventRepository.ts'
import { TalkEvent, type TalkEventPrimitives } from '../../domain/models/TalkEvent.ts'
import type { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable.ts'

export class EventRepositoryMongo implements EventRepository, Reseteable {
  private readonly talkEvents: Collection<TalkEventPrimitives>

  public static async create({ container }: interfaces.Context) {
    return new EventRepositoryMongo(await container.getAsync(MongoClient))
  }

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
