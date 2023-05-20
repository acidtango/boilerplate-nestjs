import { JOYCE_LIN } from '../../shared/infrastructure/fixtures/speakers'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { EventBusNoopFake } from '../../../test/fakes/EventBusFake'
import { UpdateSpeakerProfile, UpdateSpeakerProfileParams } from './UpdateSpeakerProfile'
import { SpeakerName } from '../domain/SpeakerName'
import { SpeakerAge } from '../domain/SpeakerAge'
import { Language } from '../../shared/domain/models/Language'

describe('UpdateSpeakerProfile', () => {
  let speakerRepository: SpeakerRepositoryFake
  let eventBus: EventBusNoopFake
  let updateSpeakerProfile: UpdateSpeakerProfile

  beforeEach(() => {
    speakerRepository = SpeakerRepositoryFake.createWithJoyceLin()
    eventBus = new EventBusNoopFake()
    updateSpeakerProfile = new UpdateSpeakerProfile(speakerRepository, eventBus)
  })

  it('saves the speaker in the repository with the profile', async () => {
    const speakerId = new SpeakerId(JOYCE_LIN.id)
    const name = new SpeakerName(JOYCE_LIN.name)
    const age = new SpeakerAge(JOYCE_LIN.age)
    const language = Language.ENGLISH
    const params: UpdateSpeakerProfileParams = {
      id: speakerId,
      name,
      age,
      language,
    }

    await updateSpeakerProfile.execute(params)

    const speaker = speakerRepository.getLatestSavedSpeaker()
    expect(speaker.has(name)).toBe(true)
    expect(speaker.has(age)).toBe(true)
    expect(speaker.has(language)).toBe(true)
  })
})
