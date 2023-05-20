import { DomainError } from '../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid login credentials', DomainErrorCode.INVALID_LOGIN_CREDENTIALS)
  }
}
