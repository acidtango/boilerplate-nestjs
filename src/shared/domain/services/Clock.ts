import { Instant } from '../models/Instant.ts'

export interface Clock {
  now(): Instant
}
