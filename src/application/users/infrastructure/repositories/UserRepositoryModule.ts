import { Global, Module } from '@nestjs/common'
import { USER_REPOSITORY_TOKEN } from '../../domain/UserRepository'
import { UserRepositoryMikroORM } from './UserRepositoryMikroORM'

@Global()
@Module({
  exports: [USER_REPOSITORY_TOKEN],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepositoryMikroORM,
    },
  ],
})
export class UserRepositoryModule {}
