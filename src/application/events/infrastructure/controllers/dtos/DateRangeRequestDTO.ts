export class DateRangeRequestDTO {
  readonly startDate: Date

  readonly endDate: Date

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate
    this.endDate = endDate
  }
}
