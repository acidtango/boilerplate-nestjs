import { ContactsTable } from './schemas/ContactsTable'
import { UsersTable } from './schemas/UsersTable'

export type DatabaseSchema = {
  users: UsersTable
  contacts: ContactsTable
}
