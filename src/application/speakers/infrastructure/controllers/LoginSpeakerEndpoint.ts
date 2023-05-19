import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { LoginSpeakerRequestDTO } from './dtos/LoginSpeakerRequestDTO'
import { LoginSpeaker } from '../../use-cases/LoginSpeaker'
import { EmailAddress } from '../../../shared/domain/EmailAddress'
import { PlainPassword } from '../../../shared/domain/PlainPassword'

@Controller('/v1/speakers/login')
export class LoginSpeakerEndpoint {
  constructor(private readonly createSpeaker: LoginSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Login a speaker to get the auth tokens',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: LoginSpeakerRequestDTO) {
    const email = EmailAddress.fromPrimitives(body.email)
    const password = PlainPassword.fromPrimitives(body.password)

    await this.createSpeaker.execute({ email, password })
  }
}
