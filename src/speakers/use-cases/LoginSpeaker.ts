import jwt from 'jsonwebtoken'
import type { interfaces } from 'inversify'
import { EmailAddress } from '../../shared/domain/models/EmailAddress.ts'
import { PlainPassword } from '../../shared/domain/models/PlainPassword.ts'
import type { SpeakerRepository } from '../domain/repositories/SpeakerRepository.ts'
import type { Clock } from '../../shared/domain/services/Clock.ts'
import { InvalidCredentialsError } from '../domain/errors/InvalidCredentialsError.ts'
import { Speaker } from '../domain/models/Speaker.ts'
import type { JwtPayload } from '../../auth/domain/JwtPayload.ts'
import { Role } from '../../shared/domain/models/Role.ts'
import { Token } from '../../shared/domain/services/Token.ts'

export type LoginSpeakerParams = {
  email: EmailAddress
  password: PlainPassword
}

export class LoginSpeaker {
  static async create({ container }: interfaces.Context) {
    return new LoginSpeaker(
      await container.getAsync(Token.SPEAKER_REPOSITORY),
      container.get(Token.CLOCK)
    )
  }

  private readonly speakerRepository: SpeakerRepository

  private readonly clock: Clock

  constructor(speakerRepository: SpeakerRepository, clock: Clock) {
    this.clock = clock
    this.speakerRepository = speakerRepository
  }

  async execute({ email, password }: LoginSpeakerParams): Promise<string> {
    const speaker = await this.speakerRepository.findBy(email)

    if (!speaker) {
      throw new InvalidCredentialsError()
    }

    if (speaker.doesNotHaveMatching(password)) {
      throw new InvalidCredentialsError()
    }

    return this.createAccessToken(speaker)
  }

  private createAccessToken(speaker: Speaker) {
    const now = this.clock.now()
    const nowInSeconds = now.toSeconds()
    const tomorrow = now.addDays(1)
    const tomorrowInSeconds = tomorrow.toSeconds()

    const payload: JwtPayload = {
      iat: nowInSeconds,
      sub: speaker.getIdString(),
      exp: tomorrowInSeconds,
      role: Role.SPEAKER,
    }

    return jwt.sign(payload, 'ilovecats')
  }
}
