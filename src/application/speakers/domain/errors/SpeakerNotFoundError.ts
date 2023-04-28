import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class SpeakerNotFoundError extends DomainError {
  constructor(notExistentId: string) {
    super(`Speaker with id ${notExistentId} not found`, DomainErrorCode.SPEAKER_DOES_NOT_EXISTS)
  }
}
