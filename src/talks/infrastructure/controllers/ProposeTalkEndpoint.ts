import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { ProposeTalk } from '../../use-cases/ProposeTalk'
import { ProposeTalkRequestDTO } from './dtos/ProposeTalkRequestDTO'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { TalkTitle } from '../../domain/models/TalkTitle'
import { TalkDescription } from '../../domain/models/TalkDescription'
import { EventId } from '../../../shared/domain/models/ids/EventId'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'

@Controller('/v1/talks')
export class ProposeTalkEndpoint {
  constructor(private readonly proposeTalk: ProposeTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Creates a talk',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: ProposeTalkRequestDTO) {
    await this.proposeTalk.execute({
      id: TalkId.fromPrimitives(body.id),
      title: TalkTitle.fromPrimitives(body.title),
      description: TalkDescription.fromPrimitives(body.description),
      cospeakers: body.cospeakers.map(SpeakerId.fromPrimitives),
      language: body.language,
      eventId: EventId.fromPrimitives(body.eventId),
      speakerId: SpeakerId.fromPrimitives(body.speakerId),
    })
  }
}
