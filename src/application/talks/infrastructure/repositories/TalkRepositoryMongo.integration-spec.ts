import { Test, TestingModule } from '@nestjs/testing'
import { createApiTalk, createApiTalkId } from '../../../../../test/mother/TalkMother'
import { TalkRepositoryMongo } from './TalkRepositoryMongo'
import { MongoModule } from '../../../../shared/infrastructure/database/MongoModule'

describe('TalkRepositoryMongo', () => {
  let module: TestingModule
  let talkRepository: TalkRepositoryMongo

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [TalkRepositoryMongo],
    }).compile()

    talkRepository = module.get(TalkRepositoryMongo)
  })

  beforeEach(async () => {
    await talkRepository.reset()
  })

  afterAll(async () => {
    await module.close()
  })

  it('saves the talk', async () => {
    const talkId = createApiTalkId()
    const talk = createApiTalk({ id: talkId })

    await talkRepository.save(talk)

    const savedTalk = await talkRepository.findById(talkId)
    expect(savedTalk).toEqual(talk)
  })

  it('findById returns undefined if not found', async () => {
    const notExistentId = createApiTalkId()

    const notExistentTalk = await talkRepository.findById(notExistentId)

    expect(notExistentTalk).toBeUndefined()
  })
})
