import { DomainError } from "../../../shared/domain/errors/DomainError.ts";
import { EmailAddress } from "../../../shared/domain/models/EmailAddress.ts";
import { DomainErrorCode } from "../../../shared/domain/errors/DomainErrorCode.ts";

export class SpeakerEmailAlreadyUsedError extends DomainError {
  constructor(email: EmailAddress) {
    super(
      `Speaker with email ${email} already exists`,
      DomainErrorCode.SPEAKER_EMAIL_ALREADY_USED
    );
  }
}
