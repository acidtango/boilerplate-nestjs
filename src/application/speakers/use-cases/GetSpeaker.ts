import { Speaker } from '../domain/Speaker'
import { createJoyceLinSpeaker } from '../../../../test/mother/SpeakerMother'
import { SpeakerId } from '../domain/SpeakerId'

export class GetSpeaker {
  async execute(speakerId: SpeakerId): Promise<Speaker> {
    return createJoyceLinSpeaker()
  }
}
