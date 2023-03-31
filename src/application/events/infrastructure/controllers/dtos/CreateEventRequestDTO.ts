import { DateRangeRequestDTO } from './DateRangeRequestDTO'
import { ProposalDateRangeRequestDTO } from './ProposalDateRangeRequestDTO'
import { IsString, IsUUID, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CODEMOTION } from '../../../../../shared/fixtures/events'

type CreateEventRequestDTOParams = {
  id: string
  name: string
  dateRange: DateRangeRequestDTO
  proposalsDateRange: ProposalDateRangeRequestDTO
}

export class CreateEventRequestDTO {
  @ApiProperty({ example: CODEMOTION.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: CODEMOTION.name })
  @IsString()
  name!: string

  @ApiProperty()
  @ValidateNested()
  dateRange!: DateRangeRequestDTO

  @ApiProperty()
  proposalsDateRange!: ProposalDateRangeRequestDTO

  static create(params: CreateEventRequestDTOParams) {
    const createEventRequestDTO = new CreateEventRequestDTO()
    createEventRequestDTO.id = params.id
    createEventRequestDTO.name = params.name
    createEventRequestDTO.dateRange = params.dateRange
    createEventRequestDTO.proposalsDateRange = params.proposalsDateRange
    return createEventRequestDTO
  }
}
