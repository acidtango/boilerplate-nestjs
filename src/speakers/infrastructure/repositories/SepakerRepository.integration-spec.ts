import { Test, TestingModule } from '@nestjs/testing'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { PAOLA } from '../../../shared/infrastructure/fixtures/speakers'
import { MongoModule } from '../../../shared/infrastructure/database/MongoModule'
import { SpeakerRepositoryMongo } from './SepakerRepositoryMongo'
import { SpeakerRepositoryMemory } from './SpeakerRepositoryMemory'
import { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable'
import { SpeakerRepository } from '../../domain/repositories/SpeakerRepository'
import { paolaEmail, paolaId, paolaSpeaker } from '../../../../test/mother/SpeakerMother/Paola'

describe('SpeakerRepository', () => {
  describe.each([
    [SpeakerRepositoryMongo.name, SpeakerRepositoryMongo],
    [SpeakerRepositoryMemory.name, SpeakerRepositoryMemory],
  ])('%s', (name, repositoryClass) => {
    let module: TestingModule
    let speakerRepository: SpeakerRepository & Reseteable

    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [MongoModule],
        providers: [repositoryClass],
      }).compile()

      speakerRepository = module.get(repositoryClass)
    })

    beforeEach(async () => {
      await speakerRepository.reset()
    })

    afterAll(async () => {
      await module.close()
    })

    it('saves the speaker', async () => {
      const speakerId = paolaId()
      const speaker = paolaSpeaker({ id: speakerId })

      await speakerRepository.save(speaker)

      const savedSpeaker = await speakerRepository.findById(speakerId)
      expect(savedSpeaker).toEqual(speaker)
    })

    it('checks if the speaker exists', async () => {
      const speakerId = new SpeakerId(PAOLA.id)
      const speaker = paolaSpeaker({ id: speakerId })
      await speakerRepository.save(speaker)

      const exists = await speakerRepository.exists(speakerId)

      expect(exists).toBe(true)
    })

    describe('findBy email', () => {
      it('returns undefined if does not exists', async () => {
        const email = paolaEmail()

        const speaker = await speakerRepository.findBy(email)

        expect(speaker).toBeUndefined()
      })

      it('returns the speaker if exists', async () => {
        const email = paolaEmail()
        const speaker = paolaSpeaker({ email })
        await speakerRepository.save(speaker)

        const savedSpeaker = await speakerRepository.findBy(email)

        expect(savedSpeaker).toEqual(speaker)
      })
    })

    describe('existsWith', () => {
      it('returns false if does not exists', async () => {
        const email = paolaEmail()

        const exists = await speakerRepository.existsWith(email)

        expect(exists).toBe(false)
      })

      it('checks if the speaker with an email already exists', async () => {
        const email = paolaEmail()
        const speaker = paolaSpeaker({ email })
        await speakerRepository.save(speaker)

        const exists = await speakerRepository.existsWith(email)

        expect(exists).toBe(true)
      })
    })
  })
})
