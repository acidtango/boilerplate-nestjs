import { ApiProperty } from '@nestjs/swagger'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events'
import { DateRangeDTO } from './DateRangeDTO'
import { ProposalDateRangeDTO } from './ProposalDateRangeDTO'

type EventResponseDTOParams = {
  id: string
  name: string
  dateRange: DateRangeDTO
  proposalsDateRange: ProposalDateRangeDTO
}

export class EventResponseDTO {
  @ApiProperty({ example: JSDAY_CANARIAS.id })
  id!: string

  @ApiProperty({ example: JSDAY_CANARIAS.name })
  name!: string

  @ApiProperty()
  dateRange!: DateRangeDTO

  @ApiProperty()
  proposalsDateRange!: ProposalDateRangeDTO

  static create(params: EventResponseDTOParams) {
    const eventResponseDTO = new EventResponseDTO()
    eventResponseDTO.id = params.id
    eventResponseDTO.name = params.name
    eventResponseDTO.dateRange = params.dateRange
    eventResponseDTO.proposalsDateRange = params.proposalsDateRange
    return eventResponseDTO
  }
}
