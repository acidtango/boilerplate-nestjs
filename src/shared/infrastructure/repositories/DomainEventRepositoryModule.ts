import { Global, Module } from '@nestjs/common'
import { DomainEventRepositoryTypeORM } from './DomainEventRepositoryTypeORM'

@Global()
@Module({
  providers: [DomainEventRepositoryTypeORM],
  exports: [DomainEventRepositoryTypeORM],
})
export class DomainEventRepositoryModule {}
