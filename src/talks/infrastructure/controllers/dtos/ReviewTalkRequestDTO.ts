import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { DAILOS } from '../../../../shared/infrastructure/fixtures/organizers'

export class ReviewTalkRequestDTO {
  @ApiProperty({ example: DAILOS.id })
  @IsUUID()
  reviewerId!: string
}
