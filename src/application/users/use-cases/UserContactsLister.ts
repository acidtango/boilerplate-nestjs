import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import { USER_REPOSITORY_TOKEN, UserRepository } from '../domain/UserRepository'
import { User } from '../domain/User'
import { UserFinder } from '../domain/UserFinder'

@Injectable()
export class UserContactsLister extends UseCase {
  private userFinder: UserFinder

  constructor(@Inject(USER_REPOSITORY_TOKEN) userRepository: UserRepository) {
    super()
    this.userFinder = new UserFinder(userRepository)
  }

  async execute(userId: UserId): Promise<User> {
    return this.userFinder.findById(userId)
  }
}
