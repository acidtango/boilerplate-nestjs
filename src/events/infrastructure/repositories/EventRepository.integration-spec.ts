import { Test, TestingModule } from '@nestjs/testing'
import { MongoModule } from '../../../shared/infrastructure/database/MongoModule'
import { EventRepositoryMongo } from './EventRepositoryMongo'
import { EventRepositoryMemory } from './EventRepositoryMemory'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'
import { EventRepository } from '../../domain/repositories/EventRepository'
import { jsdayEvent, jsdayId } from '../../../../test/mother/EventMother/JsDay'
import { codemotionEvent } from '../../../../test/mother/EventMother/Codemotion'

describe('TalkEventRepository', () => {
  describe.each([
    [EventRepositoryMongo.name, EventRepositoryMongo],
    [EventRepositoryMemory.name, EventRepositoryMemory],
  ])('%s', (name, repositoryClass) => {
    let module: TestingModule
    let talkEventRepository: EventRepository & Reseteable

    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [MongoModule],
        providers: [repositoryClass],
      }).compile()

      talkEventRepository = module.get(repositoryClass)
    })

    beforeEach(async () => {
      await talkEventRepository.reset()
    })

    afterAll(async () => {
      await module.close()
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
