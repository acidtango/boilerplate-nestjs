import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { CESAR } from '../../../../shared/infrastructure/fixtures/organizers'

export class ReviewTalkRequestDTO {
  @ApiProperty({ example: CESAR.id })
  @IsUUID()
  reviewerId!: string
}
