import { DomainEvent } from "../../../shared/domain/events/DomainEvent.ts";
import { SpeakerId } from "../../../shared/domain/models/ids/SpeakerId.ts";
import { DomainEventCode } from "../../../shared/domain/events/DomainEventCode.ts";

export class SpeakerRegistered extends DomainEvent {
  readonly id: SpeakerId;

  constructor(id: SpeakerId) {
    super(DomainEventCode.SPEAKER_REGISTERED);
    this.id = id;
  }
}
