import { Global, Module } from '@nestjs/common'
import { MongoClient } from 'mongodb'
import { createMongoClientMemory } from '../../../application/shared/infrastructure/createMongoClientMemory'

@Global()
@Module({
  providers: [
    {
      provide: MongoClient,
      useFactory: createMongoClientMemory,
    },
  ],
  exports: [MongoClient],
})
export class MongoMemoryModule {}
