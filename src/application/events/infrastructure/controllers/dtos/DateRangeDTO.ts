import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'
import { CODEMOTION } from '../../../../shared/infrastructure/fixtures/events'

export class DateRangeDTO {
  @ApiProperty({ example: CODEMOTION.startDate, format: 'date-time' })
  @IsISO8601()
  startDate!: string

  @ApiProperty({ example: CODEMOTION.endDate, format: 'date-time' })
  @IsISO8601()
  endDate!: string
}
