import { v4 as generateUuid } from 'uuid'
import { ContactPrimitives } from '../application/users/domain/Contact'
import { User, UserPrimitives } from '../application/users/domain/User'
import { OLIVER } from '../shared/fixtures/users'

export class UserBuilder {
  private static current = UserBuilder.cleanState()

  private static cleanState(): UserPrimitives {
    return {
      ...OLIVER,
      contacts: OLIVER.contacts,
      id: generateUuid(),
    }
  }

  private static reset() {
    UserBuilder.current = UserBuilder.cleanState()
  }

  static withUserId(id: string) {
    UserBuilder.current.id = id

    return this
  }

  static withContacts(contacts: ContactPrimitives[]) {
    UserBuilder.current.contacts = contacts

    return this
  }

  static withName(name: string) {
    UserBuilder.current.name = name

    return this
  }

  static withPhone(phone: string) {
    UserBuilder.current.phone = phone

    return this
  }

  static build(): UserPrimitives {
    const built = UserBuilder.current

    UserBuilder.reset()

    return built
  }

  static buildDomainObject(): User {
    const built = UserBuilder.current

    UserBuilder.reset()

    return User.fromPrimitives(built)
  }
}
