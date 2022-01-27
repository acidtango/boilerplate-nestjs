import { Injectable } from '@nestjs/common'
import { ContactRepository } from '../../domain/ContactRepository'
import { Contact, ContactPrimitives } from '../../domain/Contact'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { Contacts } from '../../domain/Contacts'

@Injectable()
export class ContactRepositoryMemory implements ContactRepository {
  private contacts: ContactPrimitives[] = []

  async findAllOfUser(userId: UserId): Promise<Contacts> {
    const contacts = this.contacts.filter((contact) => contact.owner === userId.toPrimitives())

    return Contacts.fromPrimitives({ contacts })
  }

  async save(contact: Contact): Promise<void> {
    this.contacts.push(contact.toPrimitives())
  }
}
