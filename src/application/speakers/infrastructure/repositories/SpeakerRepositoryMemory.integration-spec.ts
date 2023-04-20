import { SpeakerRepositoryMemory } from './SpeakerRepositoryMemory'
import { createJoyceLinId, createJoyceLinSpeaker } from '../../../../../test/mother/SpeakerMother'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'

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
    const speakerId = new SpeakerId(JOYCE_LIN.id)
    const speaker = createJoyceLinSpeaker({ id: speakerId })
    await speakerRepository.save(speaker)

    const exists = await speakerRepository.exists(speakerId)

    expect(exists).toBe(true)
  })
})
