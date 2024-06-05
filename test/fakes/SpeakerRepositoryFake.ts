import { SpeakerRepositoryMemory } from '../../src/speakers/infrastructure/repositories/SpeakerRepositoryMemory'
import { Speaker } from '../../src/speakers/domain/models/Speaker'
import { paolaSpeaker, paolaSpeakerWithoutProfile } from '../mother/SpeakerMother/Paola'

export class SpeakerRepositoryFake extends SpeakerRepositoryMemory {
  static empty() {
    return new SpeakerRepositoryFake()
  }

  static with(...speakers: Speaker[]) {
    const speakerRepository = new SpeakerRepositoryFake()

    for (const speaker of speakers) {
      speakerRepository.saveSync(speaker)
    }

    return speakerRepository
  }

  static createWithPaola(): SpeakerRepositoryFake {
    const speaker = paolaSpeaker()

    return this.with(speaker)
  }

  static createWithPaolaWithoutProfile(): SpeakerRepositoryFake {
    const speaker = paolaSpeakerWithoutProfile()

    return this.with(speaker)
  }

  getLatestSavedSpeaker(): Speaker {
    const speakers = Array.from(this.speakers.values())
    const lastSpeaker = speakers[speakers.length - 1]
    return Speaker.fromPrimitives(lastSpeaker)
  }
}
