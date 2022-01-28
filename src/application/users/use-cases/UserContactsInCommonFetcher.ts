import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import { USER_REPOSITORY_TOKEN, UserRepository } from '../domain/UserRepository'
import { UserFinder } from '../domain/UserFinder'
import { Contacts } from '../domain/UserContacts'
import { Contact } from '../domain/Contact'

@Injectable()
export class UserContactsInCommonFetcher extends UseCase {
  private userFinder: UserFinder

  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository) {
    super()
    this.userFinder = new UserFinder(userRepository)
  }

  async execute(userId1: UserId, userId2: UserId): Promise<Contacts> {
    const user1 = await this.userFinder.findById(userId1)
    const user2 = await this.userFinder.findById(userId2)

    console.log(user1, user2)

    const contacts = user1.contactsInCommonWith(user2)

    console.log('contactsInCommon', contacts)

    return this.filterContactsThatAreNotUsers(contacts)
  }

  private async filterContactsThatAreNotUsers(contacts: Contacts): Promise<Contacts> {
    const registeredContacts: Contact[] = []

    for (const contact of contacts) {
      const isUser = await this.userRepository.isUser(contact)

      if (isUser) {
        registeredContacts.push(contact)
      }
    }

    return new Contacts(registeredContacts)
  }
}
