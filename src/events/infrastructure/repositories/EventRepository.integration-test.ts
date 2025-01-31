import { MongoClient } from 'mongodb'
import { BindingScopeEnum, Container } from 'inversify'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable.ts'
import type { Closable } from '../../../shared/infrastructure/repositories/Closable.ts'
import type { EventRepository } from '../../domain/repositories/EventRepository.ts'
import { EventRepositoryMemory } from './EventRepositoryMemory.ts'
import { EventRepositoryMongo } from './EventRepositoryMongo.ts'
import { jsdayEvent, jsdayId } from '../../../../test/mother/EventMother/JsDay.ts'
import { codemotionEvent } from '../../../../test/mother/EventMother/Codemotion.ts'
import { createMongoClient } from '../../../shared/infrastructure/repositories/CreateMongoClient.ts'

describe('TalkEventRepository', () => {
  const container = new Container({ defaultScope: BindingScopeEnum.Singleton })
  container.bind(EventRepositoryMemory).toDynamicValue(EventRepositoryMemory.create)
  container.bind(EventRepositoryMongo).toDynamicValue(EventRepositoryMongo.create)
  container.bind(MongoClient).toDynamicValue(createMongoClient)

  describe.each([
    [EventRepositoryMemory.name, EventRepositoryMemory],
    [EventRepositoryMongo.name, EventRepositoryMongo],
  ])(`%s`, (name, repositoryClass) => {
    let talkEventRepository: EventRepository & Reseteable & Closable

    beforeAll(async () => {
      talkEventRepository = await container.getAsync(repositoryClass)
    })

    beforeEach(async () => {
      await talkEventRepository.reset()
    })

    afterAll(async () => {
      await talkEventRepository.close()
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
