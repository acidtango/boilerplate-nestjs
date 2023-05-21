import { DomainError } from '../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'

export class TalkCannotBeApprovedError extends DomainError {
  constructor(talkId: TalkId) {
    super(`Talk ${talkId} can not be approved`, DomainErrorCode.TALK_CANNOT_BE_APPROVED)
  }
}
