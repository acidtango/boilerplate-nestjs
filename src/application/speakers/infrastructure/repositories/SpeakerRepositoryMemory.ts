import { SpeakerRepository } from '../../domain/SpeakerRepository'
import { Speaker, SpeakerPrimitives } from '../../domain/Speaker'
import { Reseteable } from '../../../../shared/infrastructure/repositories/Reseteable'

export class SpeakerRepositoryMemory implements SpeakerRepository, Reseteable {
  protected speakers: Map<string, SpeakerPrimitives> = new Map()

  async save(speaker: Speaker): Promise<void> {
    const speakerPrimitives = speaker.toPrimitives()

    this.speakers.set(speakerPrimitives.id, speakerPrimitives)
  }

  async findById(id: string): Promise<Speaker | undefined> {
    const speakerPrimitives = this.speakers.get(id)

    if (!speakerPrimitives) return undefined

    return Speaker.fromPrimitives(speakerPrimitives)
  }

  async exists(id: string): Promise<boolean> {
    return this.speakers.has(id)
  }

  async reset() {
    this.speakers.clear()
  }
}
