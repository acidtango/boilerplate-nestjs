import { DomainError } from '../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class TalkDescriptionTooLongError extends DomainError {
  constructor() {
    super('Talk description too long', DomainErrorCode.TALK_DESCRIPTION_TOO_LONG)
  }
}
