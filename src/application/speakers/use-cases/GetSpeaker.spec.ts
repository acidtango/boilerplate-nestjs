import { createJoyceLinId, createJoyceLinSpeaker } from '../../../../test/mother/SpeakerMother'
import { GetSpeaker } from './GetSpeaker'
import { SpeakerId } from '../domain/SpeakerId'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'
import { SpeakerRepositoryFake } from '../../../../test/fakes/SpeakerRepositoryFake'

describe('GetSpeaker', () => {
  it('returns the speaker by id', async () => {
    const expectedSpeakerId = createJoyceLinId()
    const speakerRepository = SpeakerRepositoryFake.createWithJoyceLin()
    const getSpeakerUseCase = new GetSpeaker(speakerRepository)

    const speaker = await getSpeakerUseCase.execute(expectedSpeakerId)

    const expectedSpeaker = createJoyceLinSpeaker({ id: expectedSpeakerId })
    expect(speaker).toEqual(expectedSpeaker)
  })

  it('fails if the speaker does not exist', async () => {
    const notExistentId = new SpeakerId('invalid-id')
    const speakerRepository = SpeakerRepositoryFake.empty()
    const getSpeakerUseCase = new GetSpeaker(speakerRepository)

    const expectedError = new SpeakerNotFoundError(notExistentId)
    await expect(getSpeakerUseCase.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
