import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { CreateTalk } from '../../use-cases/CreateTalk'
import { CreateTalkRequestDTO } from './dtos/CreateTalkRequestDTO'
import { EventId } from '../../../../shared/domain/ids/EventId'

@Controller('/v1/talks')
export class CreateTalkEndpoint {
  constructor(private readonly createTalk: CreateTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Creates a talk',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: CreateTalkRequestDTO) {
    await this.createTalk.execute({
      id: body.id,
      title: body.title,
      description: body.description,
      cospeakers: body.cospeakers,
      language: body.language,
      eventId: EventId.fromPrimitives(body.eventId),
      speakerId: body.speakerId,
    })
  }
}
