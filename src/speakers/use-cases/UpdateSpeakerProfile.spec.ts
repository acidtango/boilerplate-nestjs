import { CONCHA_ASENSIO } from '../../shared/infrastructure/fixtures/speakers'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { EventBusNoopFake } from '../../../test/fakes/EventBusFake'
import { UpdateSpeakerProfile } from './UpdateSpeakerProfile'
import { SpeakerName } from '../domain/SpeakerName'
import { SpeakerAge } from '../domain/SpeakerAge'
import { Language } from '../../shared/domain/models/Language'
import {
  notImportantAge,
  notImportantLanguage,
  notImportantName,
} from '../../../test/mother/SpeakerMother'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'
import { SpeakerProfileUpdated } from '../domain/events/SpeakerProfileUpdated'

describe('UpdateSpeakerProfile', () => {
  let speakerRepository: SpeakerRepositoryFake
  let eventBus: EventBusNoopFake
  let updateSpeakerProfile: UpdateSpeakerProfile

  beforeEach(() => {
    speakerRepository = SpeakerRepositoryFake.createWithConchaWithoutProfile()
    eventBus = new EventBusNoopFake()
    updateSpeakerProfile = new UpdateSpeakerProfile(speakerRepository, eventBus)
  })

  it('saves the speaker in the repository with the profile', async () => {
    const speakerId = new SpeakerId(CONCHA_ASENSIO.id)
    const name = new SpeakerName(CONCHA_ASENSIO.name)
    const age = new SpeakerAge(CONCHA_ASENSIO.age)
    const language = Language.ENGLISH

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
    const speakerId = new SpeakerId(CONCHA_ASENSIO.id)
    const name = new SpeakerName(CONCHA_ASENSIO.name)
    const age = new SpeakerAge(CONCHA_ASENSIO.age)
    const language = Language.ENGLISH

    await updateSpeakerProfile.execute({
      id: speakerId,
      name,
      age,
      language,
    })

    eventBus.expectLastEventToBe(new SpeakerProfileUpdated(speakerId))
  })

  it('fails if speaker does not exists', async () => {
    const speakerId = new SpeakerId('not-existing-id')

    const result = updateSpeakerProfile.execute({
      id: speakerId,
      name: notImportantName(),
      age: notImportantAge(),
      language: notImportantLanguage(),
    })

    await expect(result).rejects.toThrow(new SpeakerNotFoundError(speakerId))
  })
})
