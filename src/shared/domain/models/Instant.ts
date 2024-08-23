export class Instant {
  private static addDaysToDate(date: Date, number: number) {
    date = new Date(date)
    date.setDate(date.getDate() + number)
    return date
  }

  constructor(private readonly date: Date) {}

  toDate() {
    return this.date
  }

  toSeconds(): number {
    return this.date.getTime() / 1000
  }

  addDays(number: number): Instant {
    const date = Instant.addDaysToDate(this.date, number)
    return new Instant(date)
  }
}
