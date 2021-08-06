import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class PhoneInUseError extends DomainError {
  constructor(phone: string) {
    super(`User with phone ${phone} already exists`, DomainErrorCode.USER_PHONE_IN_USE)
  }
}
