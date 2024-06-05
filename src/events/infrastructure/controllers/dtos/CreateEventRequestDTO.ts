import { DateRangeDTO } from './DateRangeDTO'
import { ProposalDateRangeDTO as ProposalDateRangeDTO } from './ProposalDateRangeDTO'
import { IsString, IsUUID, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { VLCTECHFEST } from '../../../../shared/infrastructure/fixtures/events'
import { Type } from 'class-transformer'

export class CreateEventRequestDTO {
  @ApiProperty({ example: VLCTECHFEST.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: VLCTECHFEST.name })
  @IsString()
  name!: string

  @ApiProperty()
  @Type(() => DateRangeDTO)
  @ValidateNested()
  dateRange!: DateRangeDTO

  @ApiProperty()
  @Type(() => ProposalDateRangeDTO)
  @ValidateNested()
  proposalsDateRange!: ProposalDateRangeDTO
}
