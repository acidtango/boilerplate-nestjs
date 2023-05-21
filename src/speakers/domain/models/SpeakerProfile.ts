import { SpeakerName } from './SpeakerName'
import { SpeakerAge } from './SpeakerAge'
import { Language } from '../../../shared/domain/models/Language'
import { Primitives } from '../../../shared/domain/models/hex/Primitives'

export type SpeakerProfilePrimitives = Primitives<SpeakerProfile>

export class SpeakerProfile {
  static fromPrimitives(primitives: SpeakerProfilePrimitives) {
    return new SpeakerProfile(
      SpeakerName.fromPrimitives(primitives.name),
      SpeakerAge.fromPrimitives(primitives.age),
      primitives.language
    )
  }

  constructor(
    public readonly name: SpeakerName,
    public readonly age: SpeakerAge,
    public readonly language: Language
  ) {}

  has(value: SpeakerName | SpeakerAge | Language) {
    if (value instanceof SpeakerName) {
      return this.name.equalsTo(value)
    }

    if (value instanceof SpeakerAge) {
      return this.age.equalsTo(value)
    }

    return this.language === value
  }

  toPrimitives() {
    return {
      name: this.name.toPrimitives(),
      age: this.age.toPrimitives(),
      language: this.language,
    }
  }
}
