import { DomainError } from '../../../shared/domain/errors/DomainError'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class SpeakerEmailAlreadyUsedError extends DomainError {
  constructor(email: EmailAddress) {
    super(`Speaker with email ${email} already exists`, DomainErrorCode.SPEAKER_EMAIL_ALREADY_USED)
  }
}
