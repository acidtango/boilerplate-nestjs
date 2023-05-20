import { DomainError } from '../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class TalkTitleTooLongError extends DomainError {
  constructor() {
    super('Talk title too long', DomainErrorCode.TALK_TITLE_TOO_LONG)
  }
}
