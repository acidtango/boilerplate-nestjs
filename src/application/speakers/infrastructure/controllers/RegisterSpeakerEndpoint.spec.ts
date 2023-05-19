import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { EmailAddress } from '../../../shared/domain/EmailAddress'
import { RegisterSpeaker, RegisterSpeakerParams } from '../../use-cases/RegisterSpeaker'
import { RegisterSpeakerEndpoint } from './RegisterSpeakerEndpoint'
import { RegisterSpeakerRequestDTO } from './dtos/RegisterSpeakerRequestDTO'
import { PlainPassword } from '../../../shared/domain/PlainPassword'

describe('RegisterSpeakerEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const registerSpeaker = { execute: jest.fn() } as unknown as RegisterSpeaker
    const endpoint = new RegisterSpeakerEndpoint(registerSpeaker)
    const registerSpeakerDTO = RegisterSpeakerRequestDTO.create({
      id: JOYCE_LIN.id,
      email: JOYCE_LIN.email,
      password: JOYCE_LIN.password,
    })

    await endpoint.execute(registerSpeakerDTO)

    const expectedParams: RegisterSpeakerParams = {
      id: SpeakerId.fromPrimitives(JOYCE_LIN.id),
      email: EmailAddress.fromPrimitives(JOYCE_LIN.email),
      password: PlainPassword.fromPrimitives(JOYCE_LIN.password),
    }
    expect(registerSpeaker.execute).toHaveBeenCalledWith(expectedParams)
  })
})
