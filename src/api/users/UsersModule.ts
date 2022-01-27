import { Module } from '@nestjs/common'
import { UserRepositoryModule } from '../../application/users/infrastructure/repositories/UserRepositoryModule'
import { UserCreator } from '../../application/users/use-cases/UserCreator'
import { UsersController } from './UsersController'
import { ContactRepositoryModule } from '../../application/contacts/infrastructure/repositories/ContactRepositoryModule'
import { UserContactsUpdater } from '../../application/contacts/use-cases/UserContactsUpdater'
import { ContactsInCommonFetcher } from '../../application/contacts/use-cases/ContactsInCommonFetcher'
import { UserContactsLister } from '../../application/contacts/use-cases/UserContactsLister'

@Module({
  imports: [UserRepositoryModule, ContactRepositoryModule],
  controllers: [UsersController],
  providers: [UserCreator, UserContactsUpdater, UserContactsLister, ContactsInCommonFetcher],
})
export class UsersModule {}
