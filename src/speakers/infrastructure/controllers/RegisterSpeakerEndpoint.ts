import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { RegisterSpeakerRequestDTO } from './dtos/RegisterSpeakerRequestDTO'
import { RegisterSpeaker } from '../../use-cases/RegisterSpeaker'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress'
import { PlainPassword } from '../../../shared/domain/models/PlainPassword'

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
