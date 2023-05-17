import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class TalkCannotBeApprovedError extends DomainError {
  constructor() {
    super(`Talk can not be approved`, DomainErrorCode.TALK_CANNOT_BE_APPROVED)
  }
}
