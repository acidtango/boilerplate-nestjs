import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Contact } from '../domain/Contact'
import { CONTACT_REPOSITORY_TOKEN, ContactRepository } from '../domain/ContactRepository'

@Injectable()
export class UserContactsUpdater extends UseCase {
  constructor(@Inject(CONTACT_REPOSITORY_TOKEN) private contactRepository: ContactRepository) {
    super()
  }

  async execute(contacts: Contact[]): Promise<void> {
    for (const contact of contacts) {
      await this.contactRepository.save(contact)
    }
  }
}
