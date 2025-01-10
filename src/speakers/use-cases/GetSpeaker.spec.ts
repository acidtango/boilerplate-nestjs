import { GetSpeaker } from './GetSpeaker'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { conchaId } from '../../../test/mother/SpeakerMother/Concha'
import { nonExistingSpeakerId } from '../../../test/mother/SpeakerMother/NotImportant'

describe('GetSpeaker', () => {
  let speakerRepository: SpeakerRepositoryFake
  let getSpeakerUseCase: GetSpeaker

  beforeEach(() => {
    speakerRepository = SpeakerRepositoryFake.createWithConcha()
    getSpeakerUseCase = new GetSpeaker(speakerRepository)
  })

  it('returns the speaker by id', async () => {
    const expectedSpeakerId = conchaId()

    const speaker = await getSpeakerUseCase.execute(expectedSpeakerId)

    const expectedSpeaker = speakerRepository.getLatestSavedSpeaker()
    expect(speaker).toEqual(expectedSpeaker)
  })

  it('fails if the speaker does not exist', async () => {
    const notExistentId = nonExistingSpeakerId()

    const result = getSpeakerUseCase.execute(notExistentId)

    await expect(result).rejects.toThrowError(new SpeakerNotFoundError(notExistentId))
  })
})
