import { UserId } from '../../../shared/domain/ids/UserId'
import { User } from './User'

export const USER_REPOSITORY_TOKEN = 'UserRepository'

export interface UserRepository {
  save(user: User): Promise<void>
  findById(userId: UserId): Promise<User | undefined>
  findByPhone(phone: string): Promise<User | undefined>
  filterRegisteredPhones(phones: string[]): Promise<string[]>
}
