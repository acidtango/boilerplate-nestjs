import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { juniorXpId, juniorXpTalk } from '../../../../test/mother/TalkMother/JuniorXp.ts'
import { TalkRepositoryMongo } from './TalkRepositoryMongo.ts'
import { TalkRepositoryMemory } from './TalkRepositoryMemory.ts'
import type { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable.ts'
import type { TalkRepository } from '../../domain/repositories/TalkRepository.ts'
import { BindingScopeEnum, Container } from 'inversify'
import { MongoClient } from 'mongodb'
import { createMongoClient } from '../../../shared/infrastructure/repositories/CreateMongoClient.ts'
import type { Closable } from '../../../shared/infrastructure/repositories/Closable.ts'

describe('TalkRepository', () => {
  const container = new Container({ defaultScope: BindingScopeEnum.Singleton })
  container.bind(TalkRepositoryMemory).toDynamicValue(TalkRepositoryMemory.create)
  container.bind(TalkRepositoryMongo).toDynamicValue(TalkRepositoryMongo.create)
  container.bind(MongoClient).toDynamicValue(createMongoClient)

  describe.each([
    [TalkRepositoryMemory.name, TalkRepositoryMemory],
    [TalkRepositoryMongo.name, TalkRepositoryMongo],
  ])(`%s`, (name, repositoryClass) => {
    let talkRepository: TalkRepository & Reseteable & Closable

    beforeAll(async () => {
      talkRepository = await container.getAsync(repositoryClass as any)
    })

    beforeEach(async () => {
      await talkRepository.reset()
    })

    afterAll(async () => {
      await talkRepository.close()
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
