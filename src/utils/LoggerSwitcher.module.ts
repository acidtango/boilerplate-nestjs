import { DynamicModule, Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

@Module({})
export class LoggerSwitcherModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: LoggerSwitcherModule,
      }
    }

    return {
      module: LoggerSwitcherModule,
      imports: [
        LoggerModule.forRoot({
          exclude: ['/health'],
        }),
      ],
    }
  }
}
