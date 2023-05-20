import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { MongoClient } from 'mongodb'
import { config } from '../config'

@Global()
@Module({
  providers: [
    {
      provide: MongoClient,
      useFactory: MongoModule.createMongoClient,
    },
  ],
  exports: [MongoClient],
})
export class MongoModule implements OnModuleInit, OnModuleDestroy {
  static createMongoClient() {
    const { username, password, host, port } = config.db
    return new MongoClient(`mongodb://${username}:${password}@${host}:${port}`)
  }

  constructor(private readonly client: MongoClient) {}

  async onModuleInit() {
    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.close()
  }
}
