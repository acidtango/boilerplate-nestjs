import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events'

export class DateRangeDTO {
  @ApiProperty({ example: JSDAY_CANARIAS.startDate, format: 'date-time' })
  @IsISO8601()
  startDate!: string

  @ApiProperty({ example: JSDAY_CANARIAS.endDate, format: 'date-time' })
  @IsISO8601()
  endDate!: string
}
