import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { CONTACT_REPOSITORY_TOKEN, ContactRepository } from '../domain/ContactRepository'
import { UserId } from '../../../shared/domain/ids/UserId'
import { Contacts } from '../domain/Contacts'

@Injectable()
export class UserContactsLister extends UseCase {
  constructor(@Inject(CONTACT_REPOSITORY_TOKEN) private contactRepository: ContactRepository) {
    super()
  }

  async execute(userId: UserId): Promise<Contacts> {
    return this.contactRepository.findAllOfUser(userId)
  }
}
