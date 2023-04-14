import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { EmailAddress } from '../../../shared/domain/EmailAddress'
import { SpeakerAge } from '../../domain/SpeakerAge'
import { SpeakerId } from '../../domain/SpeakerId'
import { SpeakerName } from '../../domain/SpeakerName'
import { CreateSpeaker } from '../../use-cases/CreateSpeaker'
import { CreateSpeakerRequestDTO } from './dtos/CreateSpeakerRequestDTO'

@Controller('/v1/speakers')
export class CreateSpeakerEndpoint {
  constructor(private readonly createSpeaker: CreateSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Creates a speaker',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: CreateSpeakerRequestDTO) {
    const id = SpeakerId.fromPrimitives(body.id)
    const name = SpeakerName.fromPrimitives(body.name)
    const age = SpeakerAge.fromPrimitives(body.age)
    const language = body.language
    const email = EmailAddress.fromPrimitives(body.email)

    await this.createSpeaker.execute({ id, name, age, language, email })
  }
}
