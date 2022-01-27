import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export type UserNamePrimitives = ReturnType<typeof UserName['toPrimitives']>

export class UserName extends ValueObject<string> {
  static fromPrimitives(userPrimitives: UserNamePrimitives) {
    return new UserName(userPrimitives)
  }

  static toPrimitives(userName: UserName) {
    return userName.value
  }
}
