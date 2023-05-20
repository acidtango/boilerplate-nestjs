import { HAKON_WIUM, JOYCE_LIN } from '../../shared/infrastructure/fixtures/speakers'
import { EmailAddress } from '../../shared/domain/models/EmailAddress'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { RegisterSpeaker, RegisterSpeakerParams } from './RegisterSpeaker'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { CryptoFixed } from '../../shared/infrastructure/services/crypto/CryptoFixed'
import { createJoyceLinId, joyceLinPassword } from '../../../test/mother/SpeakerMother'
import { EventBusNoopFake } from '../../../test/fakes/EventBusFake'
import { SpeakerRegistered } from '../domain/events/SpeakerRegistered'
import { SpeakerEmailAlreadyUsedError } from '../domain/errors/SpeakerEmailAlreadyUsedError'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'

describe('RegisterSpeaker', () => {
  let crypto: CryptoFixed
  let speakerRepository: SpeakerRepositoryFake
  let eventBus: EventBusNoopFake
  let registerSpeaker: RegisterSpeaker

  beforeEach(() => {
    crypto = new CryptoFixed()
    speakerRepository = SpeakerRepositoryFake.empty()
    eventBus = new EventBusNoopFake()
    registerSpeaker = new RegisterSpeaker(speakerRepository, crypto, eventBus)
  })

  it('saves the speaker in the repository', async () => {
    const params = generateRegisterJoyceParams()

    await registerSpeaker.execute(params)

    const speaker = speakerRepository.getLatestSavedSpeaker()
    expect(speaker.has(joyceLinPassword())).toBe(true)
  })

  it('emits a SpeakerRegistered event', async () => {
    const params = generateRegisterJoyceParams()

    await registerSpeaker.execute(params)

    eventBus.expectLastEventToBe(new SpeakerRegistered(params.id))
  })

  it('fails if already registered', async () => {
    const params = generateRegisterJoyceParams()
    await registerSpeaker.execute(params)

    const result = registerSpeaker.execute(params)

    await expect(result).rejects.toEqual(new SpeakerEmailAlreadyUsedError(params.email))
  })

  it('fails if exists an speaker with same id', async () => {
    const joyceLinParams = generateRegisterJoyceParams()
    await registerSpeaker.execute(joyceLinParams)
    const hakonWiumParams = generateRegisterHakonParams({ id: JOYCE_LIN.id })

    const result = registerSpeaker.execute(hakonWiumParams)

    await expect(result).rejects.toEqual(new SpeakerAlreadyCreatedError(createJoyceLinId()))
  })
})

function generateRegisterJoyceParams(): RegisterSpeakerParams {
  return {
    id: new SpeakerId(JOYCE_LIN.id),
    email: new EmailAddress(JOYCE_LIN.email),
    password: new PlainPassword(JOYCE_LIN.password),
  }
}

function generateRegisterHakonParams({ id = HAKON_WIUM.id }): RegisterSpeakerParams {
  return {
    id: new SpeakerId(id),
    email: new EmailAddress(HAKON_WIUM.email),
    password: new PlainPassword(HAKON_WIUM.password),
  }
}
