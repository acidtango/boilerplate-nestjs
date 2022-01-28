import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export type UserPhoneNumberPrimitives = ReturnType<typeof UserPhoneNumber['toPrimitives']>

export class UserPhoneNumber extends ValueObject<string> {
  static fromPrimitives(userPrimitives: UserPhoneNumberPrimitives) {
    return new UserPhoneNumber(userPrimitives)
  }

  static toPrimitives(userPhoneNumber: UserPhoneNumber) {
    return userPhoneNumber.value
  }

  equals(other: UserPhoneNumber) {
    return this.value === other.value
  }
}
