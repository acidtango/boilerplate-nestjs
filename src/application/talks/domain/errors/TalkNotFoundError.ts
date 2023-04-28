import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class TalkNotFoundError extends DomainError {
  constructor(notExistentId: string) {
    super(`Talk with id ${notExistentId} not found`, DomainErrorCode.TALK_DOES_NOT_EXISTS)
  }
}
