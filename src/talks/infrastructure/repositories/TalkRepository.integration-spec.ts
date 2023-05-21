import { Test, TestingModule } from '@nestjs/testing'
import { juniorXpId, juniorXpTalk } from '../../../../test/mother/TalkMother/JuniorXp'
import { TalkRepositoryMongo } from './TalkRepositoryMongo'
import { MongoModule } from '../../../shared/infrastructure/database/MongoModule'
import { TalkRepositoryMemory } from './TalkRepositoryMemory'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'
import { TalkRepository } from '../../domain/repositories/TalkRepository'

describe('TalkRepository', () => {
  describe.each([
    [TalkRepositoryMongo.name, TalkRepositoryMongo],
    [TalkRepositoryMemory.name, TalkRepositoryMemory],
  ])('%s', (name, repositoryClass) => {
    let module: TestingModule
    let talkRepository: TalkRepository & Reseteable

    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [MongoModule],
        providers: [repositoryClass],
      }).compile()

      talkRepository = module.get(repositoryClass)
    })

    beforeEach(async () => {
      await talkRepository.reset()
    })

    afterAll(async () => {
      await module.close()
    })

    it('saves the talk', async () => {
      const talkId = juniorXpId()
      const talk = juniorXpTalk({ id: talkId })

      await talkRepository.save(talk)

      const savedTalk = await talkRepository.findBy(talkId)
      expect(savedTalk).toEqual(talk)
    })

    it('findById returns undefined if not found', async () => {
      const notExistentId = juniorXpId()

      const notExistentTalk = await talkRepository.findBy(notExistentId)

      expect(notExistentTalk).toBeUndefined()
    })
  })
})
