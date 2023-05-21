import { SpeakerName } from './SpeakerName'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { SpeakerAge } from './SpeakerAge'
import { EmailAddress } from '../../../shared/domain/models/EmailAddress'
import { Language } from '../../../shared/domain/models/Language'
import { Primitives } from '../../../shared/domain/models/hex/Primitives'
import { AggregateRoot } from '../../../shared/domain/models/hex/AggregateRoot'
import { HashedPassword } from '../../../shared/domain/models/HashedPassword'
import { PlainPassword } from '../../../shared/domain/models/PlainPassword'
import { SpeakerRegistered } from '../events/SpeakerRegistered'
import { SpeakerProfileUpdated } from '../events/SpeakerProfileUpdated'
import { ProfileNotFilledError } from '../errors/ProfileNotFilledError'
import { SpeakerProfile } from './SpeakerProfile'

export type SpeakerPrimitives = Primitives<Speaker>

export class Speaker extends AggregateRoot {
  static fromPrimitives(primitives: SpeakerPrimitives) {
    return new Speaker(
      SpeakerId.fromPrimitives(primitives.id),
      EmailAddress.fromPrimitives(primitives.email),
      HashedPassword.fromPrimitives(primitives.password),
      primitives.salt,
      primitives.isEmailValidated,
      primitives.profile ? SpeakerProfile.fromPrimitives(primitives.profile) : undefined
    )
  }

  static register(
    id: SpeakerId,
    email: EmailAddress,
    password: PlainPassword,
    salt: string
  ): Speaker {
    const hash = password.toHashed(salt)

    const speaker = new Speaker(id, email, hash, salt, false)

    speaker.recordEvent(new SpeakerRegistered(id))

    return speaker
  }

  constructor(
    private readonly id: SpeakerId,
    private readonly email: EmailAddress,
    private readonly password: HashedPassword,
    private readonly salt: string,
    private readonly isEmailValidated: boolean,
    private profile?: SpeakerProfile
  ) {
    super()
  }

  has(value: PlainPassword | SpeakerName | SpeakerAge | Language) {
    if (value instanceof PlainPassword) {
      return this.hasPassword(value)
    }

    return this.profile?.has(value) ?? false
  }

  private hasPassword(plainPassword: PlainPassword) {
    const hash = plainPassword.toHashed(this.salt)
    return this.password.equalsTo(hash)
  }

  getIdString() {
    return this.id.toString()
  }

  doesNotHaveMatching(password: PlainPassword) {
    return !this.has(password)
  }

  updateProfile(name: SpeakerName, age: SpeakerAge, language: Language) {
    this.profile = new SpeakerProfile(name, age, language)

    this.recordEvent(new SpeakerProfileUpdated(this.id))
  }

  hasProfile() {
    return Boolean(this.profile)
  }

  ensureHasProfileFilled() {
    if (!this.hasProfile()) {
      throw new ProfileNotFilledError(this.id)
    }
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      email: this.email.toPrimitives(),
      password: this.password.toPrimitives(),
      salt: this.salt,
      isEmailValidated: this.isEmailValidated,
      profile: this.profile?.toPrimitives(),
    }
  }
}
