import { Speaker } from "../models/Speaker.ts";
import { SpeakerId } from "../../../shared/domain/models/ids/SpeakerId.ts";
import { EmailAddress } from "../../../shared/domain/models/EmailAddress.ts";

export interface SpeakerRepository {
  save(speaker: Speaker): Promise<void>;
  findById(id: SpeakerId): Promise<Speaker | undefined>;
  exists(id: SpeakerId): Promise<boolean>;
  existsWith(email: EmailAddress): Promise<boolean>;
  findBy(email: EmailAddress): Promise<Speaker | undefined>;
}
