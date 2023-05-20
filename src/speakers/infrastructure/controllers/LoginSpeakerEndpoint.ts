import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { LoginSpeakerRequestDTO } from './dtos/LoginSpeakerRequestDTO'
import { LoginSpeaker } from '../../use-cases/LoginSpeaker'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress'
import { PlainPassword } from '../../../shared/domain/models/PlainPassword'
import { LoginSpeakerResponseDTO } from './dtos/LoginSpeakerResponseDTO'

@Controller('/v1/speakers/login')
export class LoginSpeakerEndpoint {
  constructor(private readonly createSpeaker: LoginSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Login a speaker to get the auth tokens',
    status: HttpStatus.OK,
  })
  @Post()
  async execute(@Body() body: LoginSpeakerRequestDTO): Promise<LoginSpeakerResponseDTO> {
    const email = EmailAddress.fromPrimitives(body.email)
    const password = PlainPassword.fromPrimitives(body.password)

    const accessToken = await this.createSpeaker.execute({ email, password })

    return new LoginSpeakerResponseDTO(accessToken)
  }
}
