import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { config } from '../config'
import { RabbitConnection } from './RabbitConnection'

@Global()
@Module({
  providers: [
    {
      provide: RabbitConnection,
      useFactory: RabbitMQModule.createRabbitMQConnection,
    },
  ],
  exports: [RabbitConnection],
})
export class RabbitMQModule implements OnModuleInit, OnModuleDestroy {
  static createRabbitMQConnection() {
    const { username, password, host: hostname, port } = config.queue.rabbitMQ
    return new RabbitConnection(`amqp://${username}:${password}@${hostname}:${port}`)
  }

  constructor(private readonly connection: RabbitConnection) {}

  async onModuleInit() {
    await this.connection.connect()
  }

  async onModuleDestroy() {
    await this.connection.close()
  }
}
