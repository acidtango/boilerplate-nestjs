import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../../AppProvider'
import { UserRepositoryTypeORM } from './UserRepositoryTypeORM'

@Global()
@Module({
  exports: [AppProvider.USER_REPOSITORY],
  providers: [
    {
      provide: AppProvider.USER_REPOSITORY,
      useClass: UserRepositoryTypeORM,
    },
  ],
})
export class UserRepositoryModule {}
