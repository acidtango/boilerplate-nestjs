import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'
import { VLCTECHFEST } from '../../../../shared/infrastructure/fixtures/events'

export class ProposalDateRangeDTO {
  @ApiProperty({ example: VLCTECHFEST.proposalsStartDate, format: 'date-time' })
  @IsISO8601()
  startDate!: string

  @ApiProperty({ example: VLCTECHFEST.proposalsDeadlineDate, format: 'date-time' })
  @IsISO8601()
  deadline!: string
}
