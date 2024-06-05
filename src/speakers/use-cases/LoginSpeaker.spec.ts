import * as jwt from 'jsonwebtoken'
import { PAOLA } from '../../shared/infrastructure/fixtures/speakers'
import { ClockFake } from '../../shared/infrastructure/services/clock/ClockFake'
import { LoginSpeaker } from './LoginSpeaker'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { InvalidCredentialsError } from '../domain/errors/InvalidCredentialsError'
import { JwtPayload } from '../../auth/domain/JwtPayload'
import { Role } from '../../shared/domain/models/Role'
import { paolaEmail, paolaPassword } from '../../../test/mother/SpeakerMother/Paola'
import { notImportantPassword } from '../../../test/mother/SpeakerMother/NotImportant'
import { dianaEmail } from '../../../test/mother/SpeakerMother/Diana'

describe('LoginSpeaker', () => {
  let clock: ClockFake
  let speakerRepository: SpeakerRepositoryFake
  let loginSpeaker: LoginSpeaker

  beforeEach(() => {
    clock = new ClockFake()
    speakerRepository = SpeakerRepositoryFake.createWithPaola()
    loginSpeaker = new LoginSpeaker(speakerRepository, clock)
  })

  it('returns an access token if credentials are valid', async () => {
    const now = clock.now()
    const expectedIat = now.toSeconds()
    const expectedExp = now.addDays(1).toSeconds()

    const accessToken = await loginSpeaker.execute({
      email: paolaEmail(),
      password: paolaPassword(),
    })

    const content = jwt.decode(accessToken) as JwtPayload
    expect(content.sub).toEqual(PAOLA.id)
    expect(content.iat).toEqual(expectedIat)
    expect(content.exp).toEqual(expectedExp)
    expect(content.role).toEqual(Role.SPEAKER)
  })

  it('fails if password is incorrect', async () => {
    const result = loginSpeaker.execute({
      email: paolaEmail(),
      password: new PlainPassword('wrong password'),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })

  it('fails if email is not found', async () => {
    const result = loginSpeaker.execute({
      email: dianaEmail(),
      password: notImportantPassword(),
    })

    await expect(result).rejects.toEqual(new InvalidCredentialsError())
  })
})
