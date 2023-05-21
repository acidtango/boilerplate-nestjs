import { CONCHA_ASENSIO, JORGE_AGUIAR } from '../../shared/infrastructure/fixtures/speakers'
import { EmailAddress } from '../../shared/domain/models/EmailAddress'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { RegisterSpeaker, RegisterSpeakerParams } from './RegisterSpeaker'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { CryptoFixed } from '../../shared/infrastructure/services/crypto/CryptoFixed'
import { EventBusFake } from '../../../test/fakes/EventBusFake'
import { SpeakerRegistered } from '../domain/events/SpeakerRegistered'
import { SpeakerEmailAlreadyUsedError } from '../domain/errors/SpeakerEmailAlreadyUsedError'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'
import { conchaId, conchaPassword } from '../../../test/mother/SpeakerMother/Concha'

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
    const params = registerConchaParams()
    await registerSpeaker.execute(params)

    const result = registerSpeaker.execute(params)

    await expect(result).rejects.toEqual(new SpeakerEmailAlreadyUsedError(params.email))
  })

  it('fails if exists an speaker with same id', async () => {
    const conchaParams = registerConchaParams()
    await registerSpeaker.execute(conchaParams)
    const jorgeParams = registerJorgeParams({ id: CONCHA_ASENSIO.id })

    const result = registerSpeaker.execute(jorgeParams)

    await expect(result).rejects.toEqual(new SpeakerAlreadyCreatedError(conchaId()))
  })
})

function registerConchaParams(): RegisterSpeakerParams {
  return {
    id: new SpeakerId(CONCHA_ASENSIO.id),
    email: new EmailAddress(CONCHA_ASENSIO.email),
    password: new PlainPassword(CONCHA_ASENSIO.password),
  }
}

function registerJorgeParams({ id = JORGE_AGUIAR.id }): RegisterSpeakerParams {
  return {
    id: new SpeakerId(id),
    email: new EmailAddress(JORGE_AGUIAR.email),
    password: new PlainPassword(JORGE_AGUIAR.password),
  }
}
