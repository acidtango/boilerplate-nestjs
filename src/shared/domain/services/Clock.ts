import { Instant } from '../../../application/shared/domain/Instant'

export interface Clock {
  now(): Instant
}
