import { UserRepository } from '../../domain/UserRepository'
import { User } from '../../domain/User'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'
import { Nullable } from '../../../../shared/domain/utils/Nullable'
import { ContactPrimitives, UserContact } from '../../domain/UserContact'
import { Inject } from '@nestjs/common'
import { ContactsTable } from '../../../../database/schemas/ContactsTable'
import { UsersTable } from '../../../../database/schemas/UsersTable'
import { DATABASE_CONNECTION, DatabaseConnection } from '../../../../database/DatabaseConnection'

export class UserRepositoryKysely implements UserRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DatabaseConnection) {}

  async findById(userId: UserId): Promise<Nullable<User>> {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .where('users.id', '=', userId.toPrimitives())
      .executeTakeFirst()

    if (!user) return null

    return this.populateAggregateEntities(user)
  }

  async findByPhone(phone: UserPhoneNumber): Promise<Nullable<User>> {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .where('users.phone', '=', phone.toPrimitives())
      .executeTakeFirst()

    if (!user) return null

    return this.populateAggregateEntities(user)
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
      .values({
        id: userPrimitives.id,
        name: userPrimitives.name,
        phone: userPrimitives.phone,
        last_name: userPrimitives.lastName,
      })
      .onConflict((oc) =>
        oc.column('id').doUpdateSet({
          name: userPrimitives.name,
          phone: userPrimitives.phone,
          last_name: userPrimitives.lastName,
        })
      )
      .execute()

    await this.db.deleteFrom('contacts').where('contacts.user_id', '=', userPrimitives.id).execute()

    if (userPrimitives.contacts.length) {
      await this.db
        .insertInto('contacts')
        .values(
          userPrimitives.contacts.map(
            (contact): ContactsTable => ({
              name: contact.name,
              phone: contact.phone,
              user_id: userPrimitives.id,
            })
          )
        )
        .execute()
    }
  }

  async destroy() {
    await this.db.destroy()
  }

  private async populateAggregateEntities(user: UsersTable) {
    const contacts = await this.db
      .selectFrom('contacts')
      .selectAll()
      .where('contacts.user_id', '=', user.id)
      .execute()

    return User.fromPrimitives({
      id: user.id,
      phone: user.phone,
      name: user.phone,
      lastName: user.last_name,
      contacts: contacts.map(
        (c): ContactPrimitives => ({
          phone: c.phone,
          name: c.name,
        })
      ),
    })
  }
}
