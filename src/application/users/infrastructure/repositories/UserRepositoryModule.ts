import { Global, Module } from '@nestjs/common'
import { USER_REPOSITORY_TOKEN } from '../../domain/UserRepository'
import { UserRepositoryTypeORM } from './UserRepositoryTypeORM'

@Global()
@Module({
  exports: [USER_REPOSITORY_TOKEN],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepositoryTypeORM,
    },
  ],
})
export class UserRepositoryModule {}
