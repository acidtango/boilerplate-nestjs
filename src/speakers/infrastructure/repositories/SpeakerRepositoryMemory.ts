import { SpeakerRepository } from '../../domain/repositories/SpeakerRepository'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { Speaker, SpeakerPrimitives } from '../../domain/models/Speaker'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress'

export class SpeakerRepositoryMemory implements SpeakerRepository, Reseteable {
  protected speakers: Map<string, SpeakerPrimitives> = new Map()

  async save(speaker: Speaker): Promise<void> {
    this.saveSync(speaker)
  }

  protected saveSync(speaker: Speaker) {
    const speakerPrimitives = speaker.toPrimitives()

    this.speakers.set(speakerPrimitives.id, speakerPrimitives)
  }

  async findById(id: SpeakerId): Promise<Speaker | undefined> {
    const speakerPrimitives = this.speakers.get(id.toPrimitives())

    if (!speakerPrimitives) return undefined

    return Speaker.fromPrimitives(speakerPrimitives)
  }

  async exists(id: SpeakerId): Promise<boolean> {
    return this.speakers.has(id.toPrimitives())
  }

  async existsWith(email: EmailAddress): Promise<boolean> {
    return Boolean(await this.findBy(email))
  }

  async findBy(email: EmailAddress): Promise<Speaker | undefined> {
    const speakerPrimitives = this.asArray().find((s) => s.email === email.toPrimitives())

    if (!speakerPrimitives) return undefined

    return Speaker.fromPrimitives(speakerPrimitives)
  }

  private asArray() {
    return new Array(...this.speakers.values())
  }

  async reset() {
    this.speakers.clear()
  }
}
