import { DateRangeDTO } from './DateRangeDTO'
import { ProposalDateRangeDTO as ProposalDateRangeDTO } from './ProposalDateRangeDTO'
import { IsString, IsUUID, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CODEMOTION } from '../../../../shared/infrastructure/fixtures/events'
import { Type } from 'class-transformer'

export class CreateEventRequestDTO {
  @ApiProperty({ example: CODEMOTION.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: CODEMOTION.name })
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
