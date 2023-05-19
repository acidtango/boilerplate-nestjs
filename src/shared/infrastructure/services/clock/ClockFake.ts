import { Clock } from '../../../domain/services/Clock'

export class ClockFake implements Clock {
  public static now = new Date('2023-05-17T14:30:00.000Z')

  now(): Date {
    return ClockFake.now
  }

  nowInSeconds(): number {
    return this.now().getTime() / 1000
  }
}
