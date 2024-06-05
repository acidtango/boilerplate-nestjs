import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'
import { VLCTECHFEST } from '../../../../shared/infrastructure/fixtures/events'

export class DateRangeDTO {
  @ApiProperty({ example: VLCTECHFEST.startDate, format: 'date-time' })
  @IsISO8601()
  startDate!: string

  @ApiProperty({ example: VLCTECHFEST.endDate, format: 'date-time' })
  @IsISO8601()
  endDate!: string
}
