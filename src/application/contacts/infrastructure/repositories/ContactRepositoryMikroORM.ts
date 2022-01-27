import { Injectable } from '@nestjs/common'
import { EntityRepository, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { MikroORM } from '@mikro-orm/core'
import { ContactRepository } from '../../domain/ContactRepository'
import { Contact } from '../../domain/Contact'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { Contacts } from '../../domain/Contacts'

@Injectable()
export class ContactRepositoryMemory implements ContactRepository {
  private contactRepository: EntityRepository<Contact>

  constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {
    this.contactRepository = this.orm.em.getRepository(Contact)
  }

  async save(contact: Contact): Promise<void> {
    await this.contactRepository.persistAndFlush(contact)
  }

  async findAllOfUser(userId: UserId): Promise<Contacts> {
    const contacts = await this.contactRepository.find({ owner: userId.toPrimitives() })

    return new Contacts(contacts)
  }
}
