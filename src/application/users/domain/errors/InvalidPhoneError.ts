import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class InvalidPhoneError extends DomainError {
  constructor(phone: string) {
    super(
      `The string ${phone} is not a well formatted E.164 phone number`,
      DomainErrorCode.INVALID_PHONE_NUMBER
    )
  }
}
