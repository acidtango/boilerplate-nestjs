import { SpeakerName } from './SpeakerName'
import { SpeakerId } from './SpeakerId'
import { SpeakerAge } from './SpeakerAge'
import { EmailAddress } from '../../shared/domain/EmailAddress'
import { Language } from '../../shared/domain/Language'
import { Primitives } from '../../../utils/Primitives'

export type SpeakerPrimitives = Primitives<Speaker>

export class Speaker {
  constructor(
    private id: SpeakerId,
    private name: SpeakerName,
    private age: SpeakerAge,
    private language: Language,
    private email: EmailAddress,
    private isEmailValidated: boolean
  ) {}

  static fromPrimitives(primitives: SpeakerPrimitives) {
    return new Speaker(
      SpeakerId.fromPrimitives(primitives.id),
      SpeakerName.fromPrimitives(primitives.name),
      SpeakerAge.fromPrimitives(primitives.age),
      primitives.language,
      EmailAddress.fromPrimitives(primitives.email),
      primitives.isEmailValidated
    )
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      name: this.name.toPrimitives(),
      age: this.age.toPrimitives(),
      language: this.language,
      email: this.email.toPrimitives(),
      isEmailValidated: this.isEmailValidated,
    }
  }
}
