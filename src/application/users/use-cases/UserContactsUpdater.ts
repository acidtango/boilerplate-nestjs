import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import { Contact } from '../domain/Contact'
import { UserFinder } from '../domain/UserFinder'
import { UserRepository, USER_REPOSITORY_TOKEN } from '../domain/UserRepository'

@Injectable()
export class UserContactsUpdater extends UseCase {
  private userFinder: UserFinder

  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository) {
    super()

    this.userFinder = new UserFinder(userRepository)
  }

  async execute(userId: UserId, contacts: Contact[]): Promise<void> {
    const user = await this.userFinder.findById(userId)

    user.updateContacts(contacts)
    await this.userRepository.update(user)
  }
}
