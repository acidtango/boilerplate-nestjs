import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { GetTalk } from '../../use-cases/GetTalk'
import { TalkResponseDTO } from './dtos/TalkResponseDTO'
import { Talk } from '../../domain/Talk'
import { TalkStatus } from '../../domain/TalkStatus'

@Controller('/v1/talks/:id')
export class GetTalkEndpoint {
  constructor(private readonly getTalk: GetTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Get talk by id',
    status: HttpStatus.OK,
  })
  @Get()
  async execute(@Param('id') id: string): Promise<TalkResponseDTO> {
    const talk = await this.getTalk.execute(id)

    return TalkResponseDTO.create({
      id: talk.id,
      title: talk.title,
      description: talk.description,
      language: talk.language,
      cospeakers: talk.cospeakers,
      speakerId: talk.speakerId,
      eventId: talk.eventId,
      reviewerId: talk.reviewerId,
      isApproved: talk.isApproved,
      status: this.getCurrentStatus(talk),
    })
  }

  private getCurrentStatus(talk: Talk) {
    if (talk.isApproved) {
      return TalkStatus.APPROVED
    } else if (talk.isApproved === false) {
      return TalkStatus.REJECTED
    } else if (talk.reviewerId) {
      return TalkStatus.REVIEWING
    } else {
      return TalkStatus.PROPOSAL
    }
  }
}
