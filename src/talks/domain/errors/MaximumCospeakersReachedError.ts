import { DomainError } from '../../../shared/domain/errors/DomainError.ts'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode.ts'

export class MaximumCospeakersReachedError extends DomainError {
  constructor() {
    super('Maximum numbers of cospeakers reached', DomainErrorCode.MAXIMUM_COSPEAKERS_REACHED)
  }
}
