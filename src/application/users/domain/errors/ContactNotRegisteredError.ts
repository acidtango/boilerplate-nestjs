import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class ContactNotRegisteredError extends DomainError {
  constructor(phone: string) {
    super(`Contact with phone ${phone} not found`, DomainErrorCode.CONTACT_NOT_REGISTERED)
  }
}
