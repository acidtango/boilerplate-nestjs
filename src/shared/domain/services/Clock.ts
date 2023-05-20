import { Instant } from '../models/Instant'

export interface Clock {
  now(): Instant
}
