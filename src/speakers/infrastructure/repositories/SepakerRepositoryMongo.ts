import { Injectable } from '@nestjs/common'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../shared/infrastructure/config'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { Speaker, SpeakerPrimitives } from '../../domain/models/Speaker'
import { SpeakerRepository } from '../../domain/repositories/SpeakerRepository'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress'

@Injectable()
export class SpeakerRepositoryMongo implements SpeakerRepository, Reseteable {
  private readonly speakers: Collection<SpeakerPrimitives>

  constructor(private readonly client: MongoClient) {
    const db = client.db(config.db.database)
    this.speakers = db.collection('speakers')
  }

  async exists(id: SpeakerId): Promise<boolean> {
    const count = await this.speakers.countDocuments({ id: id.toPrimitives() })

    return count > 0
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
    const count = await this.speakers.countDocuments({ email: email.toPrimitives() })

    return count > 0
  }

  async findBy(email: EmailAddress): Promise<Speaker | undefined> {
    const speakerPrimitives = await this.speakers.findOne({ email: email.toPrimitives() })

    if (!speakerPrimitives) return undefined

    return Speaker.fromPrimitives(speakerPrimitives)
  }

  async reset() {
    await this.speakers.deleteMany()
  }
}
