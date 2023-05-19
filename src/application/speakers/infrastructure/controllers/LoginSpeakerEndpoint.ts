import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { CreateSpeaker } from '../../use-cases/CreateSpeaker'
import { LoginSpeakerRequestDTO } from './dtos/LoginSpeakerRequestDTO'

@Controller('/v1/speakers/login')
export class LoginSpeakerEndpoint {
  constructor(private readonly createSpeaker: CreateSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Login a speaker to get the auth tokens',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: LoginSpeakerRequestDTO) {
    // const id = SpeakerId.fromPrimitives(body.id)
    // const name = SpeakerName.fromPrimitives(body.name)
    // const age = SpeakerAge.fromPrimitives(body.age)
    // const language = body.language
    // const email = EmailAddress.fromPrimitives(body.email)
    //
    // await this.createSpeaker.execute({ id, name, age, language, email })
    throw new Error('Unimplemented method login controller')
  }
}
