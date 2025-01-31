import { DomainError } from '../../../shared/domain/errors/DomainError.ts'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode.ts'

export class TalkDescriptionTooLongError extends DomainError {
  constructor() {
    super('Talk description too long', DomainErrorCode.TALK_DESCRIPTION_TOO_LONG)
  }
}
