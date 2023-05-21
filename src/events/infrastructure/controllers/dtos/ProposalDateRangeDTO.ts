import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events'

export class ProposalDateRangeDTO {
  @ApiProperty({ example: JSDAY_CANARIAS.proposalsStartDate, format: 'date-time' })
  @IsISO8601()
  startDate!: string

  @ApiProperty({ example: JSDAY_CANARIAS.proposalsDeadlineDate, format: 'date-time' })
  @IsISO8601()
  deadline!: string
}
