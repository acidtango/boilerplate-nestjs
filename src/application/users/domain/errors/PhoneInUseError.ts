import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'
import { UserPhoneNumber } from '../UserPhoneNumber'

export class PhoneInUseError extends DomainError {
  constructor(phone: UserPhoneNumber) {
    super(`User with phone ${phone} already exists`, DomainErrorCode.USER_PHONE_IN_USE)
  }
}
