import { User } from './User'
import { Nullable } from '../../../shared/domain/utils/Nullable'
import { UserPhoneNumber } from './UserPhoneNumber'

export const USER_REPOSITORY_TOKEN = 'UserRepository'

export interface UserRepository {
  save(user: User): Promise<void>
  findByPhone(phone: UserPhoneNumber): Promise<Nullable<User>>
}
