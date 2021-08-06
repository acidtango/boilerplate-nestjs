import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import { UserFinder } from '../domain/UserFinder'
import { UserRepository, USER_REPOSITORY_TOKEN } from '../domain/UserRepository'

@Injectable()
export class ContactsInCommonFetcher extends UseCase {
  private userFinder: UserFinder

  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository) {
    super()

    this.userFinder = new UserFinder(userRepository)
  }

  async execute(userId1: UserId, userId2: UserId): Promise<string[]> {
    const firstUser = await this.userFinder.findById(userId1)
    const secondUser = await this.userFinder.findById(userId2)

    const commonContacts = firstUser.contactsInCommonWith(secondUser)

    const commonPhones = commonContacts.map((contact) => contact.getPhone())
    const commonAndRegisteredPhones = this.userRepository.filterRegisteredPhones(commonPhones)

    return commonAndRegisteredPhones
  }
}
