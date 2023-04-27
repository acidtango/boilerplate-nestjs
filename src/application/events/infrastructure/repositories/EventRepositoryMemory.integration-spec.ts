import { Test, TestingModule } from '@nestjs/testing'
import {
  createCanariasJSEvent,
  createCodemotionEvent,
  createCodemotionEventId,
} from '../../../../../test/mother/TalkEventMother'
import { MongoModule } from '../../../../shared/infrastructure/database/MongoModule'
import { EventRepositoryMongo } from './EventRepositoryMongo'

describe('EventRepositoryMongo', () => {
  let module: TestingModule
  let talkEventRepository: EventRepositoryMongo

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [EventRepositoryMongo],
    }).compile()

    talkEventRepository = module.get(EventRepositoryMongo)
  })

  beforeEach(async () => {
    await talkEventRepository.reset()
  })

  afterAll(async () => {
    await module.close()
  })

  it('saves the event', async () => {
    const talkEventId = createCodemotionEventId()
    const talkEvent = createCodemotionEvent({ id: talkEventId })

    await talkEventRepository.save(talkEvent)

    const result = await talkEventRepository.exists(talkEventId)
    expect(result).toEqual(true)
  })

  it('retrieves all events', async () => {
    const codemotionTalkEvent = createCodemotionEvent()
    const canariasJSTalkEvent = createCanariasJSEvent()

    await talkEventRepository.save(codemotionTalkEvent)
    await talkEventRepository.save(canariasJSTalkEvent)

    const allEvents = await talkEventRepository.findAll()

    expect(allEvents).toHaveLength(2)
  })
})
