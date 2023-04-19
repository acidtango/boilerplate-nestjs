import { TalkRepositoryMemory } from '../../src/application/talks/infrastructure/repositories/TalkRepositoryMemory'
import { Talk } from '../../src/application/talks/domain/Talk'

export class TalkRepositoryFake extends TalkRepositoryMemory {
  static empty() {
    return new TalkRepositoryFake()
  }

  getLatestSavedTalk(): Talk {
    const talks = Array.from(this.talks.values())
    const lastTalk = talks[talks.length - 1]

    if (!lastTalk) throw new Error('No talk saved yet')

    return Talk.fromPrimitives(lastTalk)
  }
}
