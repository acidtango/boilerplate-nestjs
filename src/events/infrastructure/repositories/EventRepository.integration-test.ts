import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { BindingScopeEnum, Container } from 'inversify'
// import { EventRepositoryMongo } from './EventRepositoryMongo.ts'
import { EventRepositoryMemory } from './EventRepositoryMemory.ts'
import type { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable.ts'
import type { EventRepository } from '../../domain/repositories/EventRepository.ts'
import { jsdayEvent, jsdayId } from '../../../../test/mother/EventMother/JsDay.ts'
import { codemotionEvent } from '../../../../test/mother/EventMother/Codemotion.ts'
import { EventRepositoryMongo } from './EventRepositoryMongo.js'
import { MongoClient } from 'mongodb'
import { createMongoClient } from '../../../shared/infrastructure/repositories/CreateMongoClient.js'

describe('TalkEventRepository', () => {
  const container = new Container({ defaultScope: BindingScopeEnum.Singleton })
  container.bind(EventRepositoryMemory).toConstantValue(new EventRepositoryMemory())
  container.bind(EventRepositoryMongo).toDynamicValue(EventRepositoryMongo.create)
  container.bind(MongoClient).toDynamicValue(createMongoClient)

  describe.each([EventRepositoryMemory, EventRepositoryMongo])(`%s`, (repositoryClass) => {
    let talkEventRepository: EventRepository & Reseteable

    beforeAll(async () => {
      talkEventRepository = await container.getAsync(repositoryClass)
    })

    beforeEach(async () => {
      await talkEventRepository.reset()
    })

    afterAll(async () => {
      const mongo = await container.getAsync(MongoClient)
      await mongo.close()
    })

    it('saves the event', async () => {
      const talkEventId = jsdayId()
      const talkEvent = jsdayEvent({ id: talkEventId })

      await talkEventRepository.save(talkEvent)

      const result = await talkEventRepository.exists(talkEventId)
      expect(result).toEqual(true)
    })

    it('retrieves all events', async () => {
      const canariasJSTalkEvent = jsdayEvent()
      const codemotionTalkEvent = codemotionEvent()

      await talkEventRepository.save(canariasJSTalkEvent)
      await talkEventRepository.save(codemotionTalkEvent)

      const allEvents = await talkEventRepository.findAll()

      expect(allEvents).toHaveLength(2)
    })

    it('find retrieves the saved event', async () => {
      const event = jsdayEvent()

      await talkEventRepository.save(event)

      const [storedEvent] = await talkEventRepository.findAll()

      expect(storedEvent).toEqual(event)
    })
  })
})
