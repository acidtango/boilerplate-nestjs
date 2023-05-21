import { SpeakerRepositoryMemory } from '../../src/speakers/infrastructure/repositories/SpeakerRepositoryMemory'
import { conchaSpeaker_DEPRECATED, conchaSpeakerWithoutProfile } from '../mother/SpeakerMother'
import { Speaker } from '../../src/speakers/domain/Speaker'

export class SpeakerRepositoryFake extends SpeakerRepositoryMemory {
  private saveHasBeenCalled = false

  static empty() {
    return new SpeakerRepositoryFake()
  }

  static createWithJoyceLin(): SpeakerRepositoryFake {
    const speakerRepository = new SpeakerRepositoryFake()
    const speaker = conchaSpeaker_DEPRECATED()

    const speakerPrimitives = speaker.toPrimitives()
    speakerRepository.speakers.set(speakerPrimitives.id, speakerPrimitives)

    return speakerRepository
  }

  static createWithJoyceLinWithoutProfile(): SpeakerRepositoryFake {
    const speakerRepository = new SpeakerRepositoryFake()
    const speaker = conchaSpeakerWithoutProfile()

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

  static with(speaker: Speaker) {
    const speakerRepository = new SpeakerRepositoryFake()
    const speakerPrimitives = speaker.toPrimitives()
    speakerRepository.speakers.set(speakerPrimitives.id, speakerPrimitives)

    return speakerRepository
  }
}
