import { Test, TestingModule } from '@nestjs/testing'
import { codemotionEvent, jsdayEvent, jsdayId } from '../../../../test/mother/TalkEventMother'
import { MongoModule } from '../../../shared/infrastructure/database/MongoModule'
import { EventRepositoryMongo } from './EventRepositoryMongo'
import { EventRepositoryMemory } from './EventRepositoryMemory'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'
import { EventRepository } from '../../domain/EventRepository'

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
      const codemotionTalkEvent = jsdayEvent()
      const canariasJSTalkEvent = codemotionEvent()

      await talkEventRepository.save(codemotionTalkEvent)
      await talkEventRepository.save(canariasJSTalkEvent)

      const allEvents = await talkEventRepository.findAll()

      expect(allEvents).toHaveLength(2)
    })
  })
})
