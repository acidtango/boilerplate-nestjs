import jwt, { JwtPayload } from 'jsonwebtoken'
import { EmailAddress } from '../../shared/domain/models/EmailAddress'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { SpeakerRepository } from '../domain/SpeakerRepository'
import { Clock } from '../../shared/domain/services/Clock'
import { InvalidCredentialsError } from '../domain/errors/InvalidCredentialsError'
import { Speaker } from '../domain/Speaker'
import { Inject, Injectable } from '@nestjs/common'
import { Token } from '../../shared/domain/services/Token'

export type LoginSpeakerParams = {
  email: EmailAddress
  password: PlainPassword
}

@Injectable()
export class LoginSpeaker {
  constructor(
    @Inject(Token.SPEAKER_REPOSITORY)
    private readonly speakerRepository: SpeakerRepository,
    @Inject(Token.CLOCK)
    private readonly clock: Clock
  ) {}

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
    }

    return jwt.sign(payload, 'ilovecats')
  }
}
