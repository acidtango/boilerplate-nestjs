import { ValueObject } from './hex/ValueObject'
import { HashedPassword } from './HashedPassword'
import * as crypto from 'crypto'

export class PlainPassword extends ValueObject {
  constructor(private readonly password: string) {
    super()
  }

  static fromPrimitives(email: string): PlainPassword {
    return new PlainPassword(email)
  }

  toHashed(salt: string) {
    const hash = crypto.pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString('hex')
    return new HashedPassword(hash)
  }
}
