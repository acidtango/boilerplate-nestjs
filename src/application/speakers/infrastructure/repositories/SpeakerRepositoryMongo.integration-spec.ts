import { Test, TestingModule } from '@nestjs/testing'
import { createJoyceLinId, createJoyceLinSpeaker } from '../../../../../test/mother/SpeakerMother'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'
import { MongoModule } from '../../../../shared/infrastructure/database/MongoModule'
import { SpeakerRepositoryMongo } from './SepakerRepositoryMongo'

describe('SpeakerRepositoryMongo', () => {
  let module: TestingModule
  let speakerRepository: SpeakerRepositoryMongo

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [SpeakerRepositoryMongo],
    }).compile()

    speakerRepository = module.get(SpeakerRepositoryMongo)
  })

  beforeEach(async () => {
    await speakerRepository.reset()
  })

  afterAll(async () => {
    await module.close()
  })

  it('saves the speaker', async () => {
    const speakerId = createJoyceLinId()
    const speaker = createJoyceLinSpeaker({ id: speakerId })

    await speakerRepository.save(speaker)

    const savedSpeaker = await speakerRepository.findById(speakerId)
    expect(savedSpeaker).toEqual(speaker)
  })

  it('checks if the speaker exists', async () => {
    const speakerId = new SpeakerId(JOYCE_LIN.id)
    const speaker = createJoyceLinSpeaker({ id: speakerId })
    await speakerRepository.save(speaker)

    const exists = await speakerRepository.exists(speakerId)

    expect(exists).toBe(true)
  })
})
