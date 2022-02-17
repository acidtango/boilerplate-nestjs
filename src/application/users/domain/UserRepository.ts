import { User } from './User'
import { Nullable } from '../../../shared/domain/utils/Nullable'
import { UserPhoneNumber } from './UserPhoneNumber'
import { UserId } from '../../../shared/domain/ids/UserId'
import { UserContact } from './UserContact'

export const USER_REPOSITORY_TOKEN = 'UserRepository'

export interface UserRepository {
  save(user: User): Promise<void>
  findById(userId: UserId): Promise<Nullable<User>>
  findByPhone(phone: UserPhoneNumber): Promise<Nullable<User>>
  isUser(contact: UserContact): Promise<boolean>
}
