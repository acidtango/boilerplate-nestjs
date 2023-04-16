import { SpeakerRepositoryMemory } from './SpeakerRepositoryMemory'
import { createJoyceLinId, createJoyceLinSpeaker } from '../../../../../test/mother/SpeakerMother'

describe('SpeakerRepositoryMemory', () => {
  let speakerRepository: SpeakerRepositoryMemory

  beforeEach(() => {
    speakerRepository = new SpeakerRepositoryMemory()
  })

  it('saves the speaker', async () => {
    const speakerId = createJoyceLinId()
    const speaker = createJoyceLinSpeaker({ id: speakerId })

    await speakerRepository.save(speaker)

    const savedSpeaker = await speakerRepository.findById(speakerId)
    expect(savedSpeaker).toEqual(speaker)
  })

  it('checks if the speaker exists', async () => {
    const speakerId = createJoyceLinId()
    const speaker = createJoyceLinSpeaker({ id: speakerId })
    await speakerRepository.save(speaker)

    const exists = await speakerRepository.exists(speakerId)

    expect(exists).toBe(true)
  })
})
