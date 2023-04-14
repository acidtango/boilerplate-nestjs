import { SpeakerId } from '../../src/application/speakers/domain/SpeakerId'
import { SpeakerName } from '../../src/application/speakers/domain/SpeakerName'
import { SpeakerAge } from '../../src/application/speakers/domain/SpeakerAge'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'
import { EmailAddress } from '../../src/application/shared/domain/EmailAddress'
import { Speaker } from '../../src/application/speakers/domain/Speaker'

export function createJoyceLinSpeaker() {
  return new Speaker(
    new SpeakerId(JOYCE_LIN.id),
    new SpeakerName(JOYCE_LIN.name),
    new SpeakerAge(JOYCE_LIN.age),
    JOYCE_LIN.language,
    new EmailAddress(JOYCE_LIN.email),
    true
  )
}
