import { ApiProperty } from '@nestjs/swagger'
import { IsDate } from 'class-validator'
import { CODEMOTION } from '../../../../../shared/fixtures/events'
import { Type } from 'class-transformer'

export class DateRangeRequestDTO {
  @ApiProperty({ example: CODEMOTION.startDate })
  @IsDate()
  @Type(() => Date)
  startDate!: Date

  @ApiProperty({ example: CODEMOTION.endDate })
  @IsDate()
  @Type(() => Date)
  endDate!: Date

  static create(startDate: Date, endDate: Date) {
    const dateRangeRequestDTO = new DateRangeRequestDTO()
    dateRangeRequestDTO.startDate = startDate
    dateRangeRequestDTO.endDate = endDate
    return dateRangeRequestDTO
  }
}
