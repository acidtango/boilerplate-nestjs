import { Injectable } from '@nestjs/common'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { User, UserPrimitives } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'

@Injectable()
export class UserRepositoryMemory implements UserRepository {
  private users: UserPrimitives[] = []

  async create(user: User): Promise<void> {
    const userPrimitives = user.toPrimitives()

    const index = this.users.findIndex((u) => u.id === userPrimitives.id)

    if (index >= 0) {
      this.users[index] = userPrimitives
    } else {
      this.users.push(userPrimitives)
    }
  }

  async findById(userId: UserId): Promise<User | undefined> {
    const userPrimitives = this.users.find((u) => u.id === userId.toPrimitives())

    if (userPrimitives)
      return User.fromPrimitives(UserRepositoryMemory.sortContactPrimitives(userPrimitives))

    return undefined
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const userPrimitives = this.users.find((user) => user.phone === phone)

    if (userPrimitives)
      return User.fromPrimitives(UserRepositoryMemory.sortContactPrimitives(userPrimitives))

    return undefined
  }

  async filterRegisteredPhones(phones: string[]): Promise<string[]> {
    const registeredPhones = this.users.map((user) => user.phone)
    return phones.filter((phone) => registeredPhones.includes(phone))
  }

  async update(user: User): Promise<void> {
    await this.create(user)
  }

  private static sortContactPrimitives(userPrimitives: UserPrimitives): UserPrimitives {
    return {
      ...userPrimitives,
      contacts: [...userPrimitives.contacts].sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      }),
    }
  }
}
