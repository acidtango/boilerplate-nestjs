import { SpeakerName } from './SpeakerName'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { SpeakerAge } from './SpeakerAge'
import { EmailAddress } from '../../shared/domain/models/EmailAddress'
import { Language } from '../../shared/domain/models/Language'
import { Primitives } from '../../../utils/Primitives'
import { AggregateRoot } from '../../shared/domain/models/hex/AggregateRoot'
import { HashedPassword } from '../../shared/domain/models/HashedPassword'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { SpeakerRegistered } from './events/SpeakerRegistered'

export type SpeakerPrimitives = Primitives<Speaker>

export class Speaker extends AggregateRoot {
  constructor(
    private readonly id: SpeakerId,
    private readonly name: SpeakerName,
    private readonly age: SpeakerAge,
    private readonly language: Language,
    private readonly email: EmailAddress,
    private readonly password: HashedPassword,
    private readonly salt: string,
    private readonly isEmailValidated: boolean
  ) {
    super()
  }

  static create(
    id: SpeakerId,
    name: SpeakerName,
    age: SpeakerAge,
    language: Language,
    email: EmailAddress
  ) {
    return new Speaker(id, name, age, language, email, new HashedPassword(''), '', false)
  }

  static register(
    id: SpeakerId,
    email: EmailAddress,
    password: PlainPassword,
    salt: string
  ): Speaker {
    const hash = password.toHashed(salt)

    const speaker = new Speaker(
      id,
      SpeakerName.fromPrimitives(''),
      SpeakerAge.fromPrimitives(18),
      Language.SPANISH,
      email,
      hash,
      salt,
      false
    )

    speaker.recordEvent(new SpeakerRegistered(id))

    return speaker
  }

  has(plainPassword: PlainPassword) {
    const hash = plainPassword.toHashed(this.salt)
    return this.password.equalsTo(hash)
  }

  static fromPrimitives(primitives: SpeakerPrimitives) {
    return new Speaker(
      SpeakerId.fromPrimitives(primitives.id),
      SpeakerName.fromPrimitives(primitives.name),
      SpeakerAge.fromPrimitives(primitives.age),
      primitives.language,
      EmailAddress.fromPrimitives(primitives.email),
      HashedPassword.fromPrimitives(primitives.password),
      primitives.salt,
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
      password: this.password.toPrimitives(),
      salt: this.salt,
      isEmailValidated: this.isEmailValidated,
    }
  }

  hasValidatedEmail() {
    return false
  }

  getIdString() {
    return this.id.toString()
  }

  doesNotHaveMatching(password: PlainPassword) {
    return !this.has(password)
  }
}
