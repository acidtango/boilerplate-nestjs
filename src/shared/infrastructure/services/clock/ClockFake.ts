import { Clock } from '../../../domain/services/Clock'
import { Instant } from '../../../domain/models/Instant'

export class ClockFake implements Clock {
  public static now = new Date('2023-05-17T14:30:00.000Z')

  public static tomorrow = new Date('2023-05-18T14:30:00.000Z')

  now(): Instant {
    return new Instant(ClockFake.now)
  }
}
