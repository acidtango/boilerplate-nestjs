import { Module } from '@nestjs/common'
import { UserRepositoryModule } from '../../application/users/infrastructure/repositories/UserRepositoryModule'
import { UserCreator } from '../../application/users/use-cases/UserCreator'
import { UsersController } from './UsersController'
import { UserContactsUpdater } from '../../application/users/use-cases/UserContactsUpdater'
import { UserContactsInCommonFetcher } from '../../application/users/use-cases/UserContactsInCommonFetcher'
import { UserContactsLister } from '../../application/users/use-cases/UserContactsLister'

@Module({
  imports: [UserRepositoryModule],
  controllers: [UsersController],
  providers: [UserCreator, UserContactsUpdater, UserContactsLister, UserContactsInCommonFetcher],
})
export class UsersModule {}
