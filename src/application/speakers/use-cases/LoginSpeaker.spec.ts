import jwt, { JwtPayload } from 'jsonwebtoken'
import { JOYCE_LIN } from '../../shared/infrastructure/fixtures/speakers'
import { ClockFake } from '../../shared/infrastructure/services/clock/ClockFake'
import { LoginSpeaker } from './LoginSpeaker'
import {
  createHakonEmail,
  createJoyceLinEmail,
  createJoyceLinPassword,
  createNotImportantPassword,
} from '../../../../test/mother/SpeakerMother'
import { SpeakerRepositoryFake } from '../../../../test/fakes/SpeakerRepositoryFake'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { InvalidCredentialsError } from '../domain/errors/InvalidCredentialsError'

describe('LoginSpeaker', () => {
  it('returns an access token if credentials are valid', async () => {
    const clock = new ClockFake()
    const now = clock.now()
    const expectedIat = now.toSeconds()
    const expectedExp = now.addDays(1).toSeconds()
    const speakerRepository = SpeakerRepositoryFake.createWithJoyceLin()
    const loginSpeaker = new LoginSpeaker(speakerRepository, clock)

    const accessToken = await loginSpeaker.execute({
      email: createJoyceLinEmail(),
      password: createJoyceLinPassword(),
    })

    const content = jwt.decode(accessToken) as JwtPayload
    expect(content.sub).toEqual(JOYCE_LIN.id)
    expect(content.iat).toEqual(expectedIat)
    expect(content.exp).toEqual(expectedExp)
  })

  it('fails if password is incorrect', async () => {
    const clock = new ClockFake()
    const speakerRepository = SpeakerRepositoryFake.createWithJoyceLin()
    const loginSpeaker = new LoginSpeaker(speakerRepository, clock)

    const result = loginSpeaker.execute({
      email: createJoyceLinEmail(),
      password: new PlainPassword('wrong password'),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })

  it('fails if email is not found', async () => {
    const clock = new ClockFake()
    const speakerRepository = SpeakerRepositoryFake.createWithJoyceLin()
    const loginSpeaker = new LoginSpeaker(speakerRepository, clock)

    const result = loginSpeaker.execute({
      email: createHakonEmail(),
      password: createNotImportantPassword(),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })
})
