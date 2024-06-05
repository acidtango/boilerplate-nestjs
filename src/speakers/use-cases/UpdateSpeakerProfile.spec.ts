import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { EventBusFake } from '../../../test/fakes/EventBusFake'
import { UpdateSpeakerProfile } from './UpdateSpeakerProfile'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'
import { SpeakerProfileUpdated } from '../domain/events/SpeakerProfileUpdated'
import {
  notImportantAge,
  notImportantLanguage,
  notImportantName,
} from '../../../test/mother/SpeakerMother/NotImportant'
import {
  paolaAge,
  paolaId,
  paolaLanguage,
  paolaName,
} from '../../../test/mother/SpeakerMother/Paola'

describe('UpdateSpeakerProfile', () => {
  let speakerRepository: SpeakerRepositoryFake
  let eventBus: EventBusFake
  let updateSpeakerProfile: UpdateSpeakerProfile

  beforeEach(() => {
    speakerRepository = SpeakerRepositoryFake.createWithPaolaWithoutProfile()
    eventBus = new EventBusFake()
    updateSpeakerProfile = new UpdateSpeakerProfile(speakerRepository, eventBus)
  })

  it('saves the speaker in the repository with the profile', async () => {
    const speakerId = paolaId()
    const name = paolaName()
    const age = paolaAge()
    const language = paolaLanguage()

    await updateSpeakerProfile.execute({
      id: speakerId,
      name,
      age,
      language,
    })

    const speaker = speakerRepository.getLatestSavedSpeaker()
    expect(speaker.has(name)).toBe(true)
    expect(speaker.has(age)).toBe(true)
    expect(speaker.has(language)).toBe(true)
  })

  it('emits a domain event', async () => {
    const speakerId = paolaId()
    const name = paolaName()
    const age = paolaAge()
    const language = paolaLanguage()

    await updateSpeakerProfile.execute({
      id: speakerId,
      name,
      age,
      language,
    })

    eventBus.expectLastEventToBe(new SpeakerProfileUpdated(speakerId))
  })

  it('fails if speaker does not exists', async () => {
    const speakerId = new SpeakerId('non-existing-id')

    const result = updateSpeakerProfile.execute({
      id: speakerId,
      name: notImportantName(),
      age: notImportantAge(),
      language: notImportantLanguage(),
    })

    await expect(result).rejects.toThrow(new SpeakerNotFoundError(speakerId))
  })
})
