import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class TalkEventNotFoundError extends DomainError {
  constructor(eventId: string) {
    super(`Event with id ${eventId} not found`, DomainErrorCode.TALK_EVENT_NOT_FOUND)
  }
}
