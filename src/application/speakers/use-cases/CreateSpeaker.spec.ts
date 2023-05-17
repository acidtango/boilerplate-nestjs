import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { EmailAddress } from '../../shared/domain/EmailAddress'
import { Language } from '../../shared/domain/Language'
import { SpeakerAge } from '../domain/SpeakerAge'
import { SpeakerName } from '../domain/SpeakerName'
import { CreateSpeaker, CreateSpeakerParams } from './CreateSpeaker'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'
import { SpeakerRepositoryFake } from '../../../../test/fakes/SpeakerRepositoryFake'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'

describe('CreateSpeaker', () => {
  it('saves the speaker in the repository', async () => {
    const speakerRepository = SpeakerRepositoryFake.empty()
    const createSpeaker = new CreateSpeaker(speakerRepository)
    const params = generateCreateJoyceParams()

    await createSpeaker.execute(params)

    speakerRepository.expectSaveToHaveBeenCalled()
  })

  it('has a non validated email', async () => {
    const speakerRepository = SpeakerRepositoryFake.empty()
    const createSpeaker = new CreateSpeaker(speakerRepository)
    const params = generateCreateJoyceParams()

    await createSpeaker.execute(params)

    const speaker = speakerRepository.getLatestSavedSpeaker()
    expect(speaker.hasValidatedEmail()).toBe(false)
  })

  it('fails if event already exists', async () => {
    const speakerRepository = SpeakerRepositoryFake.createWithJoyceLin()
    const createSpeaker = new CreateSpeaker(speakerRepository)
    const params = generateCreateJoyceParams()

    const expectedError = new SpeakerAlreadyCreatedError(new SpeakerId(JOYCE_LIN.id))
    await expect(createSpeaker.execute(params)).rejects.toThrowError(expectedError)
  })
})

function generateCreateJoyceParams(): CreateSpeakerParams {
  return {
    id: new SpeakerId(JOYCE_LIN.id),
    name: new SpeakerName(JOYCE_LIN.name),
    age: new SpeakerAge(JOYCE_LIN.age),
    email: new EmailAddress(JOYCE_LIN.email),
    language: Language.ENGLISH,
  }
}
