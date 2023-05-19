import { DomainEvent } from '../../../../shared/domain/events/DomainEvent'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { DomainEventCode } from '../../../../shared/domain/events/DomainEventCode'

export class SpeakerRegistered extends DomainEvent {
  constructor(readonly id: SpeakerId) {
    super(DomainEventCode.SPEAKER_REGISTERED)
  }
}
