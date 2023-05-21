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
  conchaAge,
  conchaId,
  conchaLanguage,
  conchaName,
} from '../../../test/mother/SpeakerMother/Concha'

describe('UpdateSpeakerProfile', () => {
  let speakerRepository: SpeakerRepositoryFake
  let eventBus: EventBusFake
  let updateSpeakerProfile: UpdateSpeakerProfile

  beforeEach(() => {
    speakerRepository = SpeakerRepositoryFake.createWithConchaWithoutProfile()
    eventBus = new EventBusFake()
    updateSpeakerProfile = new UpdateSpeakerProfile(speakerRepository, eventBus)
  })

  it('saves the speaker in the repository with the profile', async () => {
    const speakerId = conchaId()
    const name = conchaName()
    const age = conchaAge()
    const language = conchaLanguage()

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
    const speakerId = conchaId()
    const name = conchaName()
    const age = conchaAge()
    const language = conchaLanguage()

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
