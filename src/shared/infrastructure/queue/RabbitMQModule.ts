import { Connection } from 'amqp-ts'
import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

@Global()
@Module({
  providers: [
    {
      provide: Connection,
      useFactory: RabbitMQModule.createRabbitMQConnection,
    },
  ],
  exports: [Connection],
})
export class RabbitMQModule implements OnModuleInit, OnModuleDestroy {
  static createRabbitMQConnection() {
    return new Connection(`amqp://acid:password@localhost:5672`)
  }

  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    await this.connection.completeConfiguration()
  }

  async onModuleDestroy() {
    await this.connection.close()
  }
}
