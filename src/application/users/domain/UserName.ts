import { SingleValueObject } from '../../../shared/domain/hex/SingleValueObject'

export type UserNamePrimitives = ReturnType<typeof UserName['toPrimitives']>

export class UserName extends SingleValueObject<string> {
  static fromPrimitives(userPrimitives: UserNamePrimitives) {
    return new UserName(userPrimitives)
  }

  static toPrimitives(userName: UserName) {
    return userName.value
  }
}
