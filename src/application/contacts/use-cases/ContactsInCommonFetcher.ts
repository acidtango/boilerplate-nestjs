import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import { CONTACT_REPOSITORY_TOKEN, ContactRepository } from '../domain/ContactRepository'
import { USER_REPOSITORY_TOKEN, UserRepository } from '../../users/domain/UserRepository'
import { Contacts } from '../domain/Contacts'
import { Contact } from '../domain/Contact'
import { UserPhoneNumber } from '../../users/domain/UserPhoneNumber'

@Injectable()
export class ContactsInCommonFetcher extends UseCase {
  constructor(
    @Inject(CONTACT_REPOSITORY_TOKEN) private contactRepository: ContactRepository,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository
  ) {
    super()
  }

  async execute(userId1: UserId, userId2: UserId): Promise<Contacts> {
    const firstUserContacts = await this.contactRepository.findAllOfUser(userId1)
    const secondUserContacts = await this.contactRepository.findAllOfUser(userId2)

    const contacts = firstUserContacts.commonWith(secondUserContacts)

    return this.filterContactsThatAreNotUsers(contacts)
  }

  private async filterContactsThatAreNotUsers(contacts: Contacts): Promise<Contacts> {
    const registeredContacts: Contact[] = []

    for (const contact of contacts) {
      const user = await this.userRepository.findByPhone(
        UserPhoneNumber.fromPrimitives(contact.getPhone())
      )

      if (user) {
        registeredContacts.push(contact)
      }
    }

    return new Contacts(registeredContacts)
  }
}
