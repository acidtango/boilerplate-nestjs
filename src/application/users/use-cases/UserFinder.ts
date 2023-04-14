import { Inject, Injectable } from '@nestjs/common'
import { AppProvider } from '../../../AppProvider'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import { User } from '../domain/User'
import { UserFinder as DomainUserFinder } from '../domain/UserFinder'
import { UserRepository } from '../domain/UserRepository'

@Injectable()
export class UserFinder extends UseCase {
  private userFinder: DomainUserFinder

  constructor(@Inject(AppProvider.USER_REPOSITORY) private userRepository: UserRepository) {
    super()

    this.userFinder = new DomainUserFinder(userRepository)
  }

  async execute(userId: UserId): Promise<User> {
    return this.userFinder.findById(userId)
  }
}
