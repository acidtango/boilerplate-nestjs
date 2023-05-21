import { Talk } from '../../src/talks/domain/models/Talk'
import { TalkRepositoryMemory } from '../../src/talks/infrastructure/repositories/TalkRepositoryMemory'
import { juniorXpId, juniorXpTalk } from '../mother/TalkMother/JuniorXp'

export class TalkRepositoryFake extends TalkRepositoryMemory {
  static empty() {
    return new TalkRepositoryFake()
  }

  static createWith(...talks: Talk[]) {
    const talkRepository = TalkRepositoryFake.empty()

    for (const talk of talks) {
      talkRepository.saveSync(talk)
    }

    return talkRepository
  }

  static createWithJuniorXp(): TalkRepositoryFake {
    return TalkRepositoryFake.createWith(juniorXpTalk())
  }

  getLatestSavedTalk(): Talk {
    const talks = Array.from(this.talks.values())
    const lastTalk = talks[talks.length - 1]

    if (!lastTalk) throw new Error('No talk saved yet')

    return Talk.fromPrimitives(lastTalk)
  }

  async getJuniorXpTalk(): Promise<Talk> {
    const talk = await this.findBy(juniorXpId())

    if (!talk) throw new Error('No talk saved yet')

    return talk
  }
}
