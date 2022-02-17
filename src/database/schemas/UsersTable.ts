import { UserPrimitives } from '../../application/users/domain/User'
import { ContactsPrimitives } from '../../application/users/domain/UserContacts'

export type UsersTable = {
  id: string
  name: string
  last_name: string
  phone: string
}

export const userDatabaseToPrimitives = (
  user: UsersTable,
  contacts: ContactsPrimitives
): UserPrimitives => ({
  id: user.id,
  phone: user.phone,
  name: user.phone,
  lastName: user.last_name,
  contacts,
})

export const userPrimitivesToDatabase = (user: UserPrimitives): UsersTable => ({
  id: user.id,
  name: user.name,
  phone: user.phone,
  last_name: user.lastName,
})
