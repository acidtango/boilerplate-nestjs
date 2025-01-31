import { DomainError } from '../../../shared/domain/errors/DomainError.ts'
import { TalkId } from '../../../shared/domain/models/ids/TalkId.ts'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode.ts'

export class TalkAlreadyBeingReviewed extends DomainError {
  constructor(talkId: TalkId) {
    super(`Talk ${talkId} is already being reviewed`, DomainErrorCode.TALK_ALREADY_BEING_REVIEWED)
  }
}
