import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { RegisterSpeaker, RegisterSpeakerParams } from './RegisterSpeaker'
import { CryptoFixed } from '../../shared/infrastructure/services/crypto/CryptoFixed'
import { EventBusFake } from '../../../test/fakes/EventBusFake'
import { SpeakerRegistered } from '../domain/events/SpeakerRegistered'
import { SpeakerEmailAlreadyUsedError } from '../domain/errors/SpeakerEmailAlreadyUsedError'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'
import {
  paolaEmail,
  paolaId,
  paolaPassword,
  paolaSpeaker,
} from '../../../test/mother/SpeakerMother/Paola'
import { dianaEmail, dianaId, dianaPassword } from '../../../test/mother/SpeakerMother/Diana'

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
    const params = registerPaolaParams()

    await registerSpeaker.execute(params)

    const speaker = speakerRepository.getLatestSavedSpeaker()
    expect(speaker.has(paolaPassword())).toBe(true)
  })

  it('emits a SpeakerRegistered event', async () => {
    const params = registerPaolaParams()

    await registerSpeaker.execute(params)

    eventBus.expectLastEventToBe(new SpeakerRegistered(params.id))
  })

  it('fails if already registered', async () => {
    await speakerRepository.save(paolaSpeaker())
    const params = registerPaolaParams()

    const result = registerSpeaker.execute(params)

    await expect(result).rejects.toEqual(new SpeakerEmailAlreadyUsedError(params.email))
  })

  it('fails if exists an speaker with same id', async () => {
    await speakerRepository.save(paolaSpeaker())
    const params = registerDianaParams({ id: paolaId() })

    const result = registerSpeaker.execute(params)

    await expect(result).rejects.toEqual(new SpeakerAlreadyCreatedError(paolaId()))
  })
})

function registerPaolaParams(): RegisterSpeakerParams {
  return {
    id: paolaId(),
    email: paolaEmail(),
    password: paolaPassword(),
  }
}

function registerDianaParams({ id = dianaId() }): RegisterSpeakerParams {
  return {
    id,
    email: dianaEmail(),
    password: dianaPassword(),
  }
}
