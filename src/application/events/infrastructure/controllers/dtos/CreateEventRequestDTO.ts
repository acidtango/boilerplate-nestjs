import { DateRangeRequestDTO } from './DateRangeRequestDTO'
import { ProposalDateRangeRequestDTO } from './ProposalDateRangeRequestDTO'

type CreateEventRequestDTOParams = {
  id: string
  name: string
  dateRange: DateRangeRequestDTO
  proposalsDateRange: ProposalDateRangeRequestDTO
}

export class CreateEventRequestDTO {
  readonly id: string

  readonly name: string

  readonly dateRange: DateRangeRequestDTO

  readonly proposalsDateRange: ProposalDateRangeRequestDTO

  constructor(params: CreateEventRequestDTOParams) {
    this.id = params.id
    this.name = params.name
    this.dateRange = params.dateRange
    this.proposalsDateRange = params.proposalsDateRange
  }
}
