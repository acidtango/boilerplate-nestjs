import { Body, Controller, HttpStatus, Param, Put } from '@nestjs/common'
import { OrganizerId } from '../../../../shared/domain/ids/OrganizerId'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { ReviewTalk } from '../../use-cases/ReviewTalk'
import { ReviewTalkRequestDTO } from './dtos/ReviewTalkRequestDTO'

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
      talkId: id,
      reviewerId: OrganizerId.fromPrimitives(body.reviewerId),
    })
  }
}
