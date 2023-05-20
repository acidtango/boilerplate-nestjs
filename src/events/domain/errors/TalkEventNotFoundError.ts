import { DomainError } from '../../../shared/domain/errors/DomainError'
import { EventId } from '../../../shared/domain/models/ids/EventId'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'

export class TalkEventNotFoundError extends DomainError {
  constructor(eventId: EventId) {
    super(`Event with id ${eventId} not found`, DomainErrorCode.TALK_EVENT_NOT_FOUND)
  }
}
