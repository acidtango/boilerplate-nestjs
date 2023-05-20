import { SpeakerRepositoryMemory } from '../../src/codetalk/speakers/infrastructure/repositories/SpeakerRepositoryMemory'
import { createJoyceLinSpeaker } from '../mother/SpeakerMother'
import { Speaker } from '../../src/codetalk/speakers/domain/Speaker'

export class SpeakerRepositoryFake extends SpeakerRepositoryMemory {
  private saveHasBeenCalled = false

  static empty() {
    return new SpeakerRepositoryFake()
  }

  static createWithJoyceLin(): SpeakerRepositoryFake {
    const speakerRepository = new SpeakerRepositoryFake()
    const speaker = createJoyceLinSpeaker()

    const speakerPrimitives = speaker.toPrimitives()
    speakerRepository.speakers.set(speakerPrimitives.id, speakerPrimitives)

    return speakerRepository
  }

  async save(speaker: Speaker): Promise<void> {
    this.saveHasBeenCalled = true
    return super.save(speaker)
  }

  getLatestSavedSpeaker(): Speaker {
    const speakers = Array.from(this.speakers.values())
    const lastSpeaker = speakers[speakers.length - 1]
    return Speaker.fromPrimitives(lastSpeaker)
  }

  expectSaveToHaveBeenCalled() {
    expect(this.saveHasBeenCalled).toBe(true)
  }
}
