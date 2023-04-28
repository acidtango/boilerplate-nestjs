import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class TalkAlreadyBeingReviewed extends DomainError {
  constructor(talkId: string) {
    super(`Talk ${talkId} is already being reviewed`, DomainErrorCode.TALK_ALREADY_BEING_REVIEWED)
  }
}
