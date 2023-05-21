import { DomainError } from '../../../shared/domain/errors/DomainError'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class ProfileNotFilledError extends DomainError {
  constructor(id: SpeakerId) {
    super(
      `The profile of the speaker with id ${id} is not filled`,
      DomainErrorCode.PROFILE_NOT_FILLED
    )
  }
}
