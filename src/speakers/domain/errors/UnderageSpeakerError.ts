import { DomainError } from "../../../shared/domain/errors/DomainError.ts";
import { DomainErrorCode } from "../../../shared/domain/errors/DomainErrorCode.ts";

export class UnderageSpeakerError extends DomainError {
  constructor(age: number) {
    super(
      `Speaker is underage: ${age} years old`,
      DomainErrorCode.UNDERAGE_SPEAKER
    );
  }
}
