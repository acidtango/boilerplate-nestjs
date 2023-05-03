import { SpeakerRepository } from '../../domain/SpeakerRepository'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { Speaker, SpeakerPrimitives } from '../../domain/Speaker'
import { Reseteable } from '../../../../shared/infrastructure/repositories/Reseteable'

export class SpeakerRepositoryMemory implements SpeakerRepository, Reseteable {
  protected speakers: Map<string, SpeakerPrimitives> = new Map()

  async save(speaker: Speaker): Promise<void> {
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

  async reset() {
    this.speakers.clear()
  }
}
