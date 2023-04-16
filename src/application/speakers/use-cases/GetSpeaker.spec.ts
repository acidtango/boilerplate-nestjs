import { createJoyceLinSpeaker } from '../../../../test/mother/SpeakerMother'
import { GetSpeaker } from './GetSpeaker'
import { SpeakerId } from '../domain/SpeakerId'
import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { SpeakerRepository } from '../domain/SpeakerRepository'
import { SpeakerRepositoryMemory } from '../infrastructure/repositories/SpeakerRepositoryMemory'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'

describe('GetSpeaker', () => {
  it('returns the speaker by id', async () => {
    const expectedSpeakerId = new SpeakerId(JOYCE_LIN.id)
    const expectedSpeaker = createJoyceLinSpeaker({ id: expectedSpeakerId })
    const speakerRepository: SpeakerRepository = new SpeakerRepositoryMemory()
    jest.spyOn(speakerRepository, 'findById').mockReturnValue(Promise.resolve(expectedSpeaker))
    const getSpeakerUseCase = new GetSpeaker(speakerRepository)

    const speaker = await getSpeakerUseCase.execute(expectedSpeakerId)

    expect(speaker).toEqual(expectedSpeaker)
  })

  it('fails if the speaker does not exist', async () => {
    const notExistentId = new SpeakerId('invalid-id')
    const speakerRepository: SpeakerRepository = new SpeakerRepositoryMemory()
    jest.spyOn(speakerRepository, 'findById').mockReturnValue(Promise.resolve(undefined))
    const getSpeakerUseCase = new GetSpeaker(speakerRepository)

    const expectedError = new SpeakerNotFoundError(notExistentId)
    await expect(getSpeakerUseCase.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
