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
  }

  withPhone(phone: UserPhoneNumber) {
    this.userPrimitives.phone = phone.toPrimitives()
    return this
  }

  build() {
    return User.fromPrimitives(this.userPrimitives)
  }
}
