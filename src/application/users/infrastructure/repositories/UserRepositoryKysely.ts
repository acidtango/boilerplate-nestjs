import { sql } from 'kysely'
import { UserRepository } from '../../domain/UserRepository'
import { User, UserPrimitives } from '../../domain/User'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'
import { Nullable } from '../../../../shared/domain/utils/Nullable'
import { UserContact } from '../../domain/UserContact'
import { Inject } from '@nestjs/common'
import {
  contactPrimitivesToDatabase,
  ContactsTable,
} from '../../../../database/schemas/ContactsTable'
import {
  userDatabaseToPrimitives,
  userPrimitivesToDatabase,
  UsersTable,
} from '../../../../database/schemas/UsersTable'
import { DATABASE_CONNECTION, DatabaseConnection } from '../../../../database/DatabaseConnection'

type UserTableAggregation = UsersTable & { contacts: ContactsTable[] }

export class UserRepositoryKysely implements UserRepository {
  private static toDomain = ({ contacts, ...user }: UserTableAggregation): User =>
    User.fromPrimitives(userDatabaseToPrimitives(user, contacts))

  constructor(@Inject(DATABASE_CONNECTION) private db: DatabaseConnection) {}

  async findById(userId: UserId): Promise<Nullable<User>> {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .select(
        sql<ContactsTable[]>`(
          select coalesce(json_agg(contacts), '[]'::json) 
          from contacts
          where contacts.user_id = users.id
        )`.as('contacts')
      )
      .where('users.id', '=', userId.toPrimitives())
      .executeTakeFirst()

    if (!user) return null

    return UserRepositoryKysely.toDomain(user)
  }

  async findByPhone(phone: UserPhoneNumber): Promise<Nullable<User>> {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .select(
        sql<ContactsTable[]>`(
          select coalesce(json_agg(contacts), '[]'::json) 
          from contacts
          where contacts.user_id = users.id
        )`.as('contacts')
      )
      .where('users.phone', '=', phone.toPrimitives())
      .executeTakeFirst()

    if (!user) return null

    return UserRepositoryKysely.toDomain(user)
  }

  async isUser(contact: UserContact): Promise<boolean> {
    const contactPrimitives = contact.toPrimitives()

    const { count } = await this.db
      .selectFrom('users')
      .select(this.db.fn.count<string>('id').as('count'))
      .where('phone', '=', contactPrimitives.phone)
      .executeTakeFirstOrThrow()

    return parseInt(count) === 1
  }

  async save(user: User): Promise<void> {
    const userPrimitives = user.toPrimitives()

    await this.db
      .insertInto('users')
      .values(userPrimitivesToDatabase(userPrimitives))
      .onConflict((oc) => oc.column('id').doUpdateSet(userPrimitivesToDatabase(userPrimitives)))
      .execute()

    await this.saveContacts(userPrimitives)
  }

  private async saveContacts({ id, contacts }: UserPrimitives) {
    await this.db.deleteFrom('contacts').where('contacts.user_id', '=', id).execute()

    if (!contacts.length) {
      return
    }

    await this.db
      .insertInto('contacts')
      .values(contacts.map(contactPrimitivesToDatabase(id)))
      .execute()
  }

  async destroy() {
    await this.db.destroy()
  }
}