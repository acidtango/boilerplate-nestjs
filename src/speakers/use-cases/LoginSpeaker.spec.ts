import jwt from 'jsonwebtoken'
import { CONCHA_ASENSIO } from '../../shared/infrastructure/fixtures/speakers'
import { ClockFake } from '../../shared/infrastructure/services/clock/ClockFake'
import { LoginSpeaker } from './LoginSpeaker'
import {
  conchaEmail,
  conchaPassword,
  jorgePassword,
  notImportantPassword,
} from '../../../test/mother/SpeakerMother'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { InvalidCredentialsError } from '../domain/errors/InvalidCredentialsError'
import { JwtPayload } from '../../auth/domain/JwtPayload'
import { Role } from '../../shared/domain/models/Role'

describe('LoginSpeaker', () => {
  it('returns an access token if credentials are valid', async () => {
    const clock = new ClockFake()
    const now = clock.now()
    const expectedIat = now.toSeconds()
    const expectedExp = now.addDays(1).toSeconds()
    const speakerRepository = SpeakerRepositoryFake.createWithConcha()
    const loginSpeaker = new LoginSpeaker(speakerRepository, clock)

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
    const clock = new ClockFake()
    const speakerRepository = SpeakerRepositoryFake.createWithConcha()
    const loginSpeaker = new LoginSpeaker(speakerRepository, clock)

    const result = loginSpeaker.execute({
      email: conchaEmail(),
      password: new PlainPassword('wrong password'),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })

  it('fails if email is not found', async () => {
    const clock = new ClockFake()
    const speakerRepository = SpeakerRepositoryFake.createWithConcha()
    const loginSpeaker = new LoginSpeaker(speakerRepository, clock)

    const result = loginSpeaker.execute({
      email: jorgePassword(),
      password: notImportantPassword(),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })
})
