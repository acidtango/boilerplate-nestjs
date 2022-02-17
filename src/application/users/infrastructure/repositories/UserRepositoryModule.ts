import { Global, Inject, Module, OnModuleDestroy, Optional } from '@nestjs/common'
import { USER_REPOSITORY_TOKEN } from '../../domain/UserRepository'
import { UserRepositoryKysely } from './UserRepositoryKysely'

@Global()
@Module({
  exports: [USER_REPOSITORY_TOKEN],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepositoryKysely,
    },
  ],
})
export class UserRepositoryModule {}
