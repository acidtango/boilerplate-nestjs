import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { FRAN } from '../../../../../shared/fixtures/organizers'

type ReviewTalkRequestDTOParams = {
  reviewerId: string
}

export class ReviewTalkRequestDTO {
  @ApiProperty({ example: FRAN.id })
  @IsUUID()
  reviewerId!: string

  static create(params: ReviewTalkRequestDTOParams) {
    const reviewTalkRequestDTO = new ReviewTalkRequestDTO()

    reviewTalkRequestDTO.reviewerId = params.reviewerId

    return reviewTalkRequestDTO
  }
}
