import { DomainError } from "../../../shared/domain/errors/DomainError.ts";
import { SpeakerId } from "../../../shared/domain/models/ids/SpeakerId.ts";
import { DomainErrorCode } from "../../../shared/domain/errors/DomainErrorCode.ts";

export class ProfileNotFilledError extends DomainError {
  constructor(id: SpeakerId) {
    super(
      `The profile of the speaker with id ${id} is not filled`,
      DomainErrorCode.PROFILE_NOT_FILLED
    );
  }
}
