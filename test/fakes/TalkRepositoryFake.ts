import { Talk } from '../../src/talks/domain/models/Talk'
import { TalkRepositoryMemory } from '../../src/talks/infrastructure/repositories/TalkRepositoryMemory'
import { discoveringTechTalentId, discoveringTechTalentTalk } from '../mother/TalkMother/DiscoveringTechTalent'

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
    return TalkRepositoryFake.createWith(discoveringTechTalentTalk())
  }

  getLatestSavedTalk(): Talk {
    const talks = Array.from(this.talks.values())
    const lastTalk = talks[talks.length - 1]

    if (!lastTalk) throw new Error('No talk saved yet')

    return Talk.fromPrimitives(lastTalk)
  }

  async getJuniorXpTalk(): Promise<Talk> {
    const talk = await this.findBy(discoveringTechTalentId())

    if (!talk) throw new Error('No talk saved yet')

    return talk
  }
}
