import { DynamicModule, Module } from '@nestjs/common'
import { MongoModule } from './MongoModule'

@Module({})
export class DatabaseSwitcherModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: DatabaseSwitcherModule,
      }
    }

    return {
      module: DatabaseSwitcherModule,
      imports: [MongoModule],
    }
  }
}
