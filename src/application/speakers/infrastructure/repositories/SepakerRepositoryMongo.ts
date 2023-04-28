import { Injectable } from '@nestjs/common'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../../config'
import { Speaker, SpeakerPrimitives } from '../../domain/Speaker'
import { SpeakerRepository } from '../../domain/SpeakerRepository'
import { Reseteable } from '../../../../shared/infrastructure/repositories/Reseteable'

@Injectable()
export class SpeakerRepositoryMongo implements SpeakerRepository, Reseteable {
  private readonly speakers: Collection<SpeakerPrimitives>

  constructor(private readonly client: MongoClient) {
    const db = client.db(config.db.database)
    this.speakers = db.collection('speakers')
  }

  async exists(id: string): Promise<boolean> {
    return Boolean(await this.speakers.findOne({ id: id }))
  }

  async save(speaker: Speaker) {
    const primitives = speaker.toPrimitives()

    await this.speakers.updateOne({ id: primitives.id }, { $set: primitives }, { upsert: true })
  }

  async findById(speakerId: string): Promise<Speaker | undefined> {
    const speakerPrimitives = await this.speakers.findOne({ id: speakerId })

    if (!speakerPrimitives) return undefined

    return Speaker.fromPrimitives(speakerPrimitives)
  }

  async reset() {
    await this.speakers.deleteMany()
  }
}
