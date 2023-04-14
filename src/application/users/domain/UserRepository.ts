import { UserId } from '../../../shared/domain/ids/UserId'
import { User } from './User'

export interface UserRepository {
  create(user: User): Promise<void>
  update(user: User): Promise<void>
  findById(userId: UserId): Promise<User | undefined>
  findByPhone(phone: string): Promise<User | undefined>
  filterRegisteredPhones(phones: string[]): Promise<string[]>
}
