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

    const params = talk.toPrimitives()
    return TalkResponseDTO.create({
      ...params,
      status: this.getCurrentStatus(talk),
    })
  }

  private getCurrentStatus(talk: Talk) {
    if (talk.getIsApproved()) {
      return TalkStatus.APPROVED
    } else if (talk.getIsApproved() === false) {
      return TalkStatus.REJECTED
    } else if (talk.getReviewerId()) {
      return TalkStatus.REVIEWING
    } else {
      return TalkStatus.PROPOSAL
    }
  }
}
