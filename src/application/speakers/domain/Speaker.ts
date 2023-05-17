import { SpeakerName } from './SpeakerName'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'
import { SpeakerAge } from './SpeakerAge'
import { EmailAddress } from '../../shared/domain/EmailAddress'
import { Language } from '../../shared/domain/Language'
import { Primitives } from '../../../utils/Primitives'

export type SpeakerPrimitives = Primitives<Speaker>

export class Speaker {
  constructor(
    private readonly id: SpeakerId,
    private readonly name: SpeakerName,
    private readonly age: SpeakerAge,
    private readonly language: Language,
    private readonly email: EmailAddress,
    private readonly isEmailValidated: boolean
  ) {}

  static create(
    id: SpeakerId,
    name: SpeakerName,
    age: SpeakerAge,
    language: Language,
    email: EmailAddress
  ) {
    return new Speaker(id, name, age, language, email, false)
  }

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

  hasValidatedEmail() {
    return false
  }
}
