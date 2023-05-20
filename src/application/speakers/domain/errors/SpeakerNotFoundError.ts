import { DomainError } from '../../../shared/domain/errors/DomainError'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class SpeakerNotFoundError extends DomainError {
  constructor(notExistentId: SpeakerId) {
    super(
      `Speaker with id ${notExistentId.toPrimitives()} not found`,
      DomainErrorCode.SPEAKER_DOES_NOT_EXISTS
    )
  }
}
