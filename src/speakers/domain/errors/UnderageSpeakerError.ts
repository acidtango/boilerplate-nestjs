import { DomainError } from '../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class UnderageSpeakerError extends DomainError {
  constructor(age: number) {
    super(`Speaker is underage: ${age} years old`, DomainErrorCode.UNDERAGE_SPEAKER)
  }
}
