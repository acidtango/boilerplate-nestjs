import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { UserId } from '../../../shared/domain/ids/UserId'
import { UserPhoneNumber } from './UserPhoneNumber'

export type UserPrimitives = ReturnType<typeof User['toPrimitives']>

export class User extends AggregateRoot {
  static fromPrimitives(userPrimitives: UserPrimitives) {
    return new User(
      UserId.fromPrimitives(userPrimitives.id),
      userPrimitives.name,
      userPrimitives.lastName,
      UserPhoneNumber.fromPrimitives(userPrimitives.phone)
    )
  }

  static toPrimitives(user: User) {
    return {
      id: user.id.toPrimitives(),
      name: user.name,
      lastName: user.lastName,
      phone: user.phone.toPrimitives(),
    }
  }

  static create({
    userId,
    name,
    lastName,
    phone,
  }: {
    userId: UserId
    name: string
    lastName: string
    phone: UserPhoneNumber
  }) {
    return new User(userId, name, lastName, phone)
  }

  constructor(
    private id: UserId,
    private name: string,
    private lastName: string,
    private phone: UserPhoneNumber
  ) {
    super()
  }

  /**
   * This method is just for testing purposes of the boilerplate. You should avoid setters/getters
   */
  setName(name: string) {
    this.name = name
  }

  toPrimitives() {
    return User.toPrimitives(this)
  }
}
