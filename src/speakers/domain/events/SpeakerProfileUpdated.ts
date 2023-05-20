import { DomainEvent } from '../../../shared/domain/events/DomainEvent'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { DomainEventCode } from '../../../shared/domain/events/DomainEventCode'

export class SpeakerProfileUpdated extends DomainEvent {
  constructor(private readonly speakerId: SpeakerId) {
    super(DomainEventCode.SPEAKER_PROFILE_UPDATED)
  }
}
