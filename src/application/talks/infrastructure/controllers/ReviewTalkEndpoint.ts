import { Body, Controller, HttpStatus, Param, Put } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { ReviewTalk } from '../../use-cases/ReviewTalk'
import { ReviewTalkRequestDTO } from './dtos/ReviewTalkRequestDTO'
import { OrganizerId } from '../../../../shared/domain/ids/OrganizerId'
import { TalkId } from '../../../../shared/domain/ids/TalkId'

@Controller('/v1/talks/:id/assignation')
export class ReviewTalkEndpoint {
  constructor(private readonly reviewTalk: ReviewTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Assigns a talk to a reviewer',
    status: HttpStatus.OK,
  })
  @Put()
  async execute(@Param('id') id: string, @Body() body: ReviewTalkRequestDTO) {
    await this.reviewTalk.execute({
      talkId: TalkId.fromPrimitives(id),
      reviewerId: OrganizerId.fromPrimitives(body.reviewerId),
    })
  }
}
