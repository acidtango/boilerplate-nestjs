import { Actor } from '../../../shared/domain/Actor'
import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { UserId } from '../../../shared/domain/ids/UserId'
import { Contact } from './Contact'
import { UserCreated } from './events/UserCreated'

export type UserPrimitives = ReturnType<typeof User['toPrimitives']>

export class User extends AggregateRoot {
  static fromPrimitives(userPrimitives: UserPrimitives) {
    return new User(
      UserId.fromPrimitives(userPrimitives.id),
      userPrimitives.name,
      userPrimitives.lastName,
      userPrimitives.phone,
      userPrimitives.contacts.map(Contact.fromPrimitives)
    )
  }

  static toPrimitives(user: User) {
    return {
      id: user.id.toPrimitives(),
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      contacts: user.contacts.map(Contact.toPrimitives),
    }
  }

  static create({
    userId,
    name,
    lastName,
    phone,
    actor,
  }: {
    userId: UserId
    name: string
    lastName: string
    phone: string
    actor: Actor
  }) {
    const user = new User(userId, name, lastName, phone, [])

    user.recordEvent(new UserCreated(userId, name, lastName, phone, actor))

    return user
  }

  constructor(
    private id: UserId,
    private name: string,
    private lastName: string,
    private phone: string,
    private contacts: Contact[]
  ) {
    super()
  }

  updateContacts(contacts: Contact[]) {
    this.contacts = contacts
  }

  contactsInCommonWith(otherUser: User): Contact[] {
    const otherUserPhoneNumbers = otherUser.contacts.map((contact) => contact.getPhone())

    return this.contacts.filter((contact) => otherUserPhoneNumbers.includes(contact.getPhone()))
  }

  toPrimitives() {
    return User.toPrimitives(this)
  }
}
