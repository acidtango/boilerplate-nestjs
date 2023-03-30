import { DateRangeRequestDTO } from './DateRangeRequestDTO'
import { ProposalDateRangeRequestDTO } from './ProposalDateRangeRequestDTO'

type CreateEventRequestDTOParams = {
  id: string
  name: string
  dateRange: DateRangeRequestDTO
  proposalsDateRange: ProposalDateRangeRequestDTO
}

export class CreateEventRequestDTO {
  constructor(params: CreateEventRequestDTOParams) {}
}
