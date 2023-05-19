import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'
import { EmailAddress } from '../../../shared/domain/EmailAddress'
import { PlainPassword } from '../../../shared/domain/PlainPassword'
import { LoginSpeakerEndpoint } from './LoginSpeakerEndpoint'
import { LoginSpeakerRequestDTO } from './dtos/LoginSpeakerRequestDTO'
import { LoginSpeaker, LoginSpeakerParams } from '../../use-cases/LoginSpeaker'

describe('LoginSpeakerEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const loginSpeaker = { execute: jest.fn() } as unknown as LoginSpeaker
    const endpoint = new LoginSpeakerEndpoint(loginSpeaker)
    const loginSpeakerRequestDTO = LoginSpeakerRequestDTO.create({
      email: JOYCE_LIN.email,
      password: JOYCE_LIN.password,
    })

    await endpoint.execute(loginSpeakerRequestDTO)

    const expectedParams: LoginSpeakerParams = {
      email: EmailAddress.fromPrimitives(JOYCE_LIN.email),
      password: PlainPassword.fromPrimitives(JOYCE_LIN.password),
    }
    expect(loginSpeaker.execute).toHaveBeenCalledWith(expectedParams)
  })
})
