import { DomainError } from "../../../shared/domain/errors/DomainError.ts";
import { DomainErrorCode } from "../../../shared/domain/errors/DomainErrorCode.ts";

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super(
      "Invalid login credentials",
      DomainErrorCode.INVALID_LOGIN_CREDENTIALS
    );
  }
}
