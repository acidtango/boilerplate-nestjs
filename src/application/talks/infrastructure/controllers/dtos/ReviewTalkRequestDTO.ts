import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { FRAN } from '../../../../../shared/fixtures/organizers'

export class ReviewTalkRequestDTO {
  @ApiProperty({ example: FRAN.id })
  @IsUUID()
  reviewerId!: string
}
