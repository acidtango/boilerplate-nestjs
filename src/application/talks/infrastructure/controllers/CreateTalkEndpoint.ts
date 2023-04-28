import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { CreateTalk } from '../../use-cases/CreateTalk'
import { CreateTalkRequestDTO } from './dtos/CreateTalkRequestDTO'
import { TalkId } from '../../../../shared/domain/ids/TalkId'
import { TalkDescription } from '../../domain/TalkDescription'
import { EventId } from '../../../../shared/domain/ids/EventId'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'

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
      id: TalkId.fromPrimitives(body.id),
      title: body.title,
      description: TalkDescription.fromPrimitives(body.description),
      cospeakers: body.cospeakers.map(SpeakerId.fromPrimitives),
      language: body.language,
      eventId: EventId.fromPrimitives(body.eventId),
      speakerId: SpeakerId.fromPrimitives(body.speakerId),
    })
  }
}
