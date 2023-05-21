import { Talk } from '../../src/talks/domain/Talk'
import { TalkRepositoryMemory } from '../../src/talks/infrastructure/repositories/TalkRepositoryMemory'
import { juniorXpTalk } from '../mother/TalkMother'

export class TalkRepositoryFake extends TalkRepositoryMemory {
  static empty() {
    return new TalkRepositoryFake()
  }

  static createWith(talk: Talk) {
    const talkRepository = TalkRepositoryFake.empty()

    talkRepository.saveSync(talk)

    return talkRepository
  }

  getLatestSavedTalk(): Talk {
    const talks = Array.from(this.talks.values())
    const lastTalk = talks[talks.length - 1]

    if (!lastTalk) throw new Error('No talk saved yet')

    return Talk.fromPrimitives(lastTalk)
  }

  static createWithApiTalk(): TalkRepositoryFake {
    const talkRepository = TalkRepositoryFake.empty()

    talkRepository.saveSync(juniorXpTalk())

    return talkRepository
  }
}
