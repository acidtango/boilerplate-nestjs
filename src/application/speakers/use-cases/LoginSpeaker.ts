import { EmailAddress } from '../../shared/domain/EmailAddress'
import { PlainPassword } from '../../shared/domain/PlainPassword'

export type LoginSpeakerParams = {
  email: EmailAddress
  password: PlainPassword
}

export class LoginSpeaker {
  constructor() {}

  async execute({ email, password }: LoginSpeakerParams): Promise<void> {
    throw new Error('Unimplemented method LoginSpeaker#execute')
  }
}
