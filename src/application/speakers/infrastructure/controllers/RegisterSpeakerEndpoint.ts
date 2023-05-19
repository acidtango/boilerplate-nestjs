import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { RegisterSpeakerRequestDTO } from './dtos/RegisterSpeakerRequestDTO'
import { RegisterSpeaker } from '../../use-cases/RegisterSpeaker'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { EmailAddress } from '../../../shared/domain/EmailAddress'
import { PlainPassword } from '../../../shared/domain/PlainPassword'

@Controller('/v1/speakers/registration')
export class RegisterSpeakerEndpoint {
  constructor(private readonly registerSpeaker: RegisterSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Registers a speaker',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: RegisterSpeakerRequestDTO) {
    const id = SpeakerId.fromPrimitives(body.id)
    const email = EmailAddress.fromPrimitives(body.email)
    const password = PlainPassword.fromPrimitives(body.password)
    await this.registerSpeaker.execute({
      id,
      email,
      password,
    })
  }
}
