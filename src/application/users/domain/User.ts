import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { UserId } from '../../../shared/domain/ids/UserId'
import { UserPhoneNumber } from './UserPhoneNumber'
import { UserContacts } from './UserContacts'

export type UserPrimitives = ReturnType<typeof User['toPrimitives']>

export class User extends AggregateRoot {
  static fromPrimitives(userPrimitives: UserPrimitives) {
    return new User(
      UserId.fromPrimitives(userPrimitives.id),
      userPrimitives.name,
      userPrimitives.lastName,
      UserPhoneNumber.fromPrimitives(userPrimitives.phone),
      UserContacts.fromPrimitives(userPrimitives.contacts)
    )
  }

  static toPrimitives(user: User) {
    return {
      id: user.id.toPrimitives(),
      name: user.name,
      lastName: user.lastName,
      phone: user.phone.toPrimitives(),
      contacts: UserContacts.toPrimitives(user.contacts),
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
    return new User(userId, name, lastName, phone, UserContacts.empty())
  }

  constructor(
    private id: UserId,
    private name: string,
    private lastName: string,
    private phone: UserPhoneNumber,
    private contacts: UserContacts
  ) {
    super()
  }

  updateContacts(contacts: UserContacts) {
    this.contacts = contacts
  }

  contactsInCommonWith(otherUser: User): UserContacts {
    return this.contacts.commonWith(otherUser.contacts)
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
