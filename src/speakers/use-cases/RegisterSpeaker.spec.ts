import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { RegisterSpeaker, RegisterSpeakerParams } from './RegisterSpeaker'
import { CryptoFixed } from '../../shared/infrastructure/services/crypto/CryptoFixed'
import { EventBusFake } from '../../../test/fakes/EventBusFake'
import { SpeakerRegistered } from '../domain/events/SpeakerRegistered'
import { SpeakerEmailAlreadyUsedError } from '../domain/errors/SpeakerEmailAlreadyUsedError'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'
import {
  conchaEmail,
  conchaId,
  conchaPassword,
  conchaSpeaker,
} from '../../../test/mother/SpeakerMother/Concha'
import { jorgeEmail, jorgeId, jorgePassword } from '../../../test/mother/SpeakerMother/Jorge'

describe('RegisterSpeaker', () => {
  let speakerRepository: SpeakerRepositoryFake
  let eventBus: EventBusFake
  let registerSpeaker: RegisterSpeaker

  beforeEach(() => {
    const crypto = new CryptoFixed()
    speakerRepository = SpeakerRepositoryFake.empty()
    eventBus = new EventBusFake()
    registerSpeaker = new RegisterSpeaker(speakerRepository, crypto, eventBus)
  })

  it('saves the speaker in the repository', async () => {
    const params = registerConchaParams()

    await registerSpeaker.execute(params)

    const speaker = speakerRepository.getLatestSavedSpeaker()
    expect(speaker.has(conchaPassword())).toBe(true)
  })

  it('emits a SpeakerRegistered event', async () => {
    const params = registerConchaParams()

    await registerSpeaker.execute(params)

    eventBus.expectLastEventToBe(new SpeakerRegistered(params.id))
  })

  it('fails if already registered', async () => {
    await speakerRepository.save(conchaSpeaker())
    const params = registerConchaParams()

    const result = registerSpeaker.execute(params)

    await expect(result).rejects.toEqual(new SpeakerEmailAlreadyUsedError(params.email))
  })

  it('fails if exists an speaker with same id', async () => {
    await speakerRepository.save(conchaSpeaker())
    const params = registerJorgeParams({ id: conchaId() })

    const result = registerSpeaker.execute(params)

    await expect(result).rejects.toEqual(new SpeakerAlreadyCreatedError(conchaId()))
  })
})

function registerConchaParams(): RegisterSpeakerParams {
  return {
    id: conchaId(),
    email: conchaEmail(),
    password: conchaPassword(),
  }
}

function registerJorgeParams({ id = jorgeId() }): RegisterSpeakerParams {
  return {
    id,
    email: jorgeEmail(),
    password: jorgePassword(),
  }
}
