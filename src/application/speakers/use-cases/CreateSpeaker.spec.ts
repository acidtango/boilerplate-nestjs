import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { EmailAddress } from '../../shared/domain/EmailAddress'
import { Language } from '../../shared/domain/Language'
import { SpeakerAge } from '../domain/SpeakerAge'
import { SpeakerId } from '../domain/SpeakerId'
import { SpeakerName } from '../domain/SpeakerName'
import { SpeakerRepositoryMemory } from '../infrastructure/repositories/SpeakerRepositoryMemory'
import { CreateSpeaker, CreateSpeakerParams } from './CreateSpeaker'

describe('CreateSpeaker', () => {
  it('saves the speaker in the repository', async () => {
    const speakerRepository = new SpeakerRepositoryMemory()
    jest.spyOn(speakerRepository, 'save')
    const createEventUseCase = new CreateSpeaker(speakerRepository)
    const params = generateCreateJoyceParams()

    await createEventUseCase.execute(params)

    expect(speakerRepository.save).toHaveBeenCalled()
  })

  it('has a non validated email', async () => {
    const speakerRepository = new SpeakerRepositoryMemory()
    jest.spyOn(speakerRepository, 'save')
    const createEventUseCase = new CreateSpeaker(speakerRepository)
    const params = generateCreateJoyceParams()

    await createEventUseCase.execute(params)

    expect(speakerRepository.save).toHaveBeenCalledWith()
  })

  // it('fails if event already exists', async () => {
  //   const eventRepository = new EventRepositoryMemory()
  //   jest.spyOn(eventRepository, 'exists').mockReturnValue(Promise.resolve(true))
  //   const createEventUseCase = new CreateEvent(eventRepository)
  //   const params = generateCreateCodemotionParams()

  //   await expect(createEventUseCase.execute(params)).rejects.toThrowError(
  //     new EventAlreadyCreatedError(new EventId(CODEMOTION.id))
  //   )
  // })
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
