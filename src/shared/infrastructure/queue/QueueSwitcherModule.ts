import { DynamicModule, Module } from '@nestjs/common'
import { RabbitMQModule } from './RabbitMQModule'

@Module({})
export class QueueSwitcherModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: QueueSwitcherModule,
      }
    }

    return {
      module: QueueSwitcherModule,
      imports: [RabbitMQModule],
    }
  }
}
