import * as crypto from 'crypto'
import { ValueObject } from './hex/ValueObject'

export class HashedPassword extends ValueObject {
  constructor(private readonly hash: string) {
    super()
  }

  static fromPrimitives(hash: string): HashedPassword {
    return new HashedPassword(hash)
  }

  toPrimitives() {
    return this.hash
  }

  equalsTo(password: HashedPassword) {
    return crypto.timingSafeEqual(Buffer.from(this.hash), Buffer.from(password.hash))
  }
}
