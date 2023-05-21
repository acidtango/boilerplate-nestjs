import { SpeakerRepositoryMemory } from '../../src/speakers/infrastructure/repositories/SpeakerRepositoryMemory'
import { conchaSpeaker, conchaSpeakerWithoutProfile } from '../mother/SpeakerMother'
import { Speaker } from '../../src/speakers/domain/Speaker'

export class SpeakerRepositoryFake extends SpeakerRepositoryMemory {
  static empty() {
    return new SpeakerRepositoryFake()
  }

  static with(speaker: Speaker) {
    const speakerRepository = new SpeakerRepositoryFake()
    const speakerPrimitives = speaker.toPrimitives()
    speakerRepository.speakers.set(speakerPrimitives.id, speakerPrimitives)

    return speakerRepository
  }

  static createWithConcha(): SpeakerRepositoryFake {
    const speaker = conchaSpeaker()

    return this.with(speaker)
  }

  static createWithConchaWithoutProfile(): SpeakerRepositoryFake {
    const speaker = conchaSpeakerWithoutProfile()

    return this.with(speaker)
  }

  getLatestSavedSpeaker(): Speaker {
    const speakers = Array.from(this.speakers.values())
    const lastSpeaker = speakers[speakers.length - 1]
    return Speaker.fromPrimitives(lastSpeaker)
  }
}
