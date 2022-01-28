import { v4 } from 'uuid'
import { User, UserPrimitives } from '../application/users/domain/User'
import { OLIVER } from '../shared/fixtures/users'
import { UserPhoneNumber } from '../application/users/domain/UserPhoneNumber'

export class UserBuilder {
  private userPrimitives: UserPrimitives = {
    name: OLIVER.name,
    lastName: OLIVER.lastName,
    phone: OLIVER.phone,
    id: v4(),
    contacts: OLIVER.contacts,
  }

  withUserId(userId: string) {
    this.userPrimitives.id = userId
    return this
  }

  withPhone(phone: UserPhoneNumber | string) {
    this.userPrimitives.phone = phone instanceof UserPhoneNumber ? phone.toPrimitives() : phone
    return this
  }

  withContacts(contacts = OLIVER.contacts) {
    this.userPrimitives.contacts = contacts
    return this
  }

  build() {
    return User.fromPrimitives(this.userPrimitives)
  }
}
