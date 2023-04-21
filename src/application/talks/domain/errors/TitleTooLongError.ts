import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class TitleTooLongError extends DomainError {
  constructor() {
    super('Talk title too long', DomainErrorCode.TALK_TITLE_TOO_LONG)
  }
}
