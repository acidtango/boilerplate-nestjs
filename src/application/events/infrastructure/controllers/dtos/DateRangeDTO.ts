import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'
import { CODEMOTION } from '../../../../../shared/fixtures/events'

export class DateRangeDTO {
  @ApiProperty({ example: CODEMOTION.startDate, format: 'date-time' })
  @IsISO8601()
  startDate!: string

  @ApiProperty({ example: CODEMOTION.endDate, format: 'date-time' })
  @IsISO8601()
  endDate!: string

  static create(startDate: Date, endDate: Date) {
    const dateRangeRequestDTO = new DateRangeDTO()
    dateRangeRequestDTO.startDate = startDate.toISOString()
    dateRangeRequestDTO.endDate = endDate.toISOString()
    return dateRangeRequestDTO
  }
}
