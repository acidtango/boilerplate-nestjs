export class ProposalDateRangeRequestDTO {
  readonly startDate: Date

  readonly deadline: Date

  constructor(startDate: Date, deadline: Date) {
    this.startDate = startDate
    this.deadline = deadline
  }
}
