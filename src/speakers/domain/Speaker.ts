import { SpeakerName } from './SpeakerName'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { SpeakerAge } from './SpeakerAge'
import { EmailAddress } from '../../shared/domain/models/EmailAddress'
import { Language } from '../../shared/domain/models/Language'
import { Primitives } from '../../shared/domain/models/hex/Primitives'
import { AggregateRoot } from '../../shared/domain/models/hex/AggregateRoot'
import { HashedPassword } from '../../shared/domain/models/HashedPassword'
import { PlainPassword } from '../../shared/domain/models/PlainPassword'
import { SpeakerRegistered } from './events/SpeakerRegistered'
import { SpeakerProfileUpdated } from './events/SpeakerProfileUpdated'
import { ProfileNotFilledError } from './errors/ProfileNotFilledError'

export type SpeakerPrimitives = Primitives<Speaker>

export class Speaker extends AggregateRoot {
  constructor(
    private readonly id: SpeakerId,
    private name: SpeakerName,
    private age: SpeakerAge,
    private language: Language,
    private readonly email: EmailAddress,
    private readonly password: HashedPassword,
    private readonly salt: string,
    private readonly isEmailValidated: boolean
  ) {
    super()
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
      Language.ENGLISH,
      email,
      hash,
      salt,
      false
    )

    speaker.recordEvent(new SpeakerRegistered(id))

    return speaker
  }

  has(value: PlainPassword | SpeakerName | SpeakerAge | Language) {
    if (value instanceof PlainPassword) {
      return this.hasPassword(value)
    }

    if (value instanceof SpeakerName) {
      return this.name.equalsTo(value)
    }

    if (value instanceof SpeakerAge) {
      return this.age.equalsTo(value)
    }

    return this.language === value
  }

  private hasPassword(plainPassword: PlainPassword) {
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

  getIdString() {
    return this.id.toString()
  }

  doesNotHaveMatching(password: PlainPassword) {
    return !this.has(password)
  }

  updateProfile(name: SpeakerName, age: SpeakerAge, language: Language) {
    this.name = name
    this.age = age
    this.language = language

    this.recordEvent(new SpeakerProfileUpdated(this.id))
  }

  hasProfile() {
    return !this.name.equalsTo(new SpeakerName(''))
  }

  getId() {
    return this.id
  }

  ensureHasProfileFilled() {
    if (!this.hasProfile()) {
      throw new ProfileNotFilledError(this.getId())
    }
  }
}
