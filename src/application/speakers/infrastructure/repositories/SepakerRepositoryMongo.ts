import { Injectable } from '@nestjs/common'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../../config'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { Speaker, SpeakerPrimitives } from '../../domain/Speaker'
import { SpeakerRepository } from '../../domain/SpeakerRepository'
import { Reseteable } from '../../../../shared/infrastructure/repositories/Reseteable'
import { EmailAddress } from '../../../shared/domain/EmailAddress'

@Injectable()
export class SpeakerRepositoryMongo implements SpeakerRepository, Reseteable {
  private readonly speakers: Collection<SpeakerPrimitives>

  constructor(private readonly client: MongoClient) {
    const db = client.db(config.db.database)
    this.speakers = db.collection('speakers')
  }

  async exists(id: SpeakerId): Promise<boolean> {
    return Boolean(await this.speakers.findOne({ id: id.toPrimitives() }))
  }

  async save(speaker: Speaker) {
    const primitives = speaker.toPrimitives()

    await this.speakers.updateOne({ id: primitives.id }, { $set: primitives }, { upsert: true })
  }

  async findById(speakerId: SpeakerId): Promise<Speaker | undefined> {
    const speakerPrimitives = await this.speakers.findOne({ id: speakerId.toPrimitives() })

    if (!speakerPrimitives) return undefined

    return Speaker.fromPrimitives(speakerPrimitives)
  }

  async existsWith(email: EmailAddress): Promise<boolean> {
    const speakerPrimitives = await this.speakers.findOne({ email: email.toPrimitives() })

    return Boolean(speakerPrimitives)
  }

  async reset() {
    await this.speakers.deleteMany()
  }
}
