import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import { USER_REPOSITORY_TOKEN, UserRepository } from '../domain/UserRepository'
import { UserFinder } from '../domain/UserFinder'
import { UserContacts } from '../domain/UserContacts'
import { UserContact } from '../domain/UserContact'

@Injectable()
export class UserContactsInCommonFetcher extends UseCase {
  private userFinder: UserFinder

  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository) {
    super()
    this.userFinder = new UserFinder(userRepository)
  }

  async execute(userId1: UserId, userId2: UserId): Promise<UserContacts> {
    const user1 = await this.userFinder.findById(userId1)
    const user2 = await this.userFinder.findById(userId2)

    const contacts = user1.contactsInCommonWith(user2)

    return this.filterContactsThatAreNotUsers(contacts)
  }

  private async filterContactsThatAreNotUsers(contacts: UserContacts): Promise<UserContacts> {
    const registeredContacts: UserContact[] = []

    for (const contact of contacts) {
      const isUser = await this.userRepository.isUser(contact)

      if (isUser) {
        registeredContacts.push(contact)
      }
    }

    return new UserContacts(registeredContacts)
  }
}
