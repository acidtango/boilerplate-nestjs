import { Injectable } from '@nestjs/common'
import { User, UserPrimitives } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'

@Injectable()
export class UserRepositoryMemory implements UserRepository {
  private users: UserPrimitives[] = []

  async save(user: User): Promise<void> {
    const userPrimitives = user.toPrimitives()

    const index = this.users.findIndex((u) => u.id === userPrimitives.id)

    if (index >= 0) {
      this.users[index] = userPrimitives
    } else {
      this.users.push(userPrimitives)
    }
  }

  async findByPhone(phone: UserPhoneNumber): Promise<User | null> {
    const userPrimitives = this.users.find((user) => user.phone === phone.toPrimitives())

    if (userPrimitives) return User.fromPrimitives(userPrimitives)

    return null
  }
}
