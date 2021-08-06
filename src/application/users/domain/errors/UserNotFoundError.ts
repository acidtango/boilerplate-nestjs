import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class UserNotFoundError extends DomainError {
  constructor(userId: UserId) {
    super(`User with id ${userId} not found`, DomainErrorCode.USER_NOT_FOUND_ERROR)
  }
}
