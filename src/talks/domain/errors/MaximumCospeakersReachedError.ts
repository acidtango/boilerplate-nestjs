import { DomainError } from '../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class MaximumCospeakersReachedError extends DomainError {
  constructor() {
    super('Maximum numbers of cospeakers reached', DomainErrorCode.MAXIMUM_COSPEAKERS_REACHED)
  }
}
