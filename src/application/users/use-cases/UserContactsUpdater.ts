import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { USER_REPOSITORY_TOKEN, UserRepository } from '../domain/UserRepository'
import { UserId } from '../../../shared/domain/ids/UserId'
import { UserFinder } from '../domain/UserFinder'
import { Contacts } from '../domain/UserContacts'

@Injectable()
export class UserContactsUpdater extends UseCase {
  private userFinder: UserFinder

  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository) {
    super()
    this.userFinder = new UserFinder(userRepository)
  }

  async execute(userId: UserId, contacts: Contacts): Promise<void> {
    const user = await this.userFinder.findById(userId)

    user.updateContacts(contacts)

    await this.userRepository.save(user)
  }
}
