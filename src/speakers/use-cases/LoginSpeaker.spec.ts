import * as jwt from 'jsonwebtoken'
import { CONCHA_ASENSIO } from '../../shared/infrastructure/fixtures/speakers'
import { ClockFake } from '../../shared/infrastructure/services/clock/ClockFake'
import { LoginSpeaker } from './LoginSpeaker'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { InvalidCredentialsError } from '../domain/errors/InvalidCredentialsError'
import { JwtPayload } from '../../auth/domain/JwtPayload'
import { Role } from '../../shared/domain/models/Role'
import { conchaEmail, conchaPassword } from '../../../test/mother/SpeakerMother/Concha'
import { notImportantPassword } from '../../../test/mother/SpeakerMother/NotImportant'
import { jorgeEmail } from '../../../test/mother/SpeakerMother/Jorge'

describe('LoginSpeaker', () => {
  let clock: ClockFake
  let speakerRepository: SpeakerRepositoryFake
  let loginSpeaker: LoginSpeaker

  beforeEach(() => {
    clock = new ClockFake()
    speakerRepository = SpeakerRepositoryFake.createWithConcha()
    loginSpeaker = new LoginSpeaker(speakerRepository, clock)
  })

  it('returns an access token if credentials are valid', async () => {
    const now = clock.now()
    const expectedIat = now.toSeconds()
    const expectedExp = now.addDays(1).toSeconds()

    const accessToken = await loginSpeaker.execute({
      email: conchaEmail(),
      password: conchaPassword(),
    })

    const content = jwt.decode(accessToken) as JwtPayload
    expect(content.sub).toEqual(CONCHA_ASENSIO.id)
    expect(content.iat).toEqual(expectedIat)
    expect(content.exp).toEqual(expectedExp)
    expect(content.role).toEqual(Role.SPEAKER)
  })

  it('fails if password is incorrect', async () => {
    const result = loginSpeaker.execute({
      email: conchaEmail(),
      password: new PlainPassword('wrong password'),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })

  it('fails if email is not found', async () => {
    const result = loginSpeaker.execute({
      email: jorgeEmail(),
      password: notImportantPassword(),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })
})
