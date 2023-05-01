import { DynamicModule, Module } from '@nestjs/common'
import { MongoModule } from './MongoModule'
import { MongoMemoryModule } from './MongoMemoryModule'

@Module({})
export class OrmSwitcherModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: OrmSwitcherModule,
        imports: [MongoMemoryModule],
      }
    }

    return {
      module: OrmSwitcherModule,
      imports: [MongoModule],
    }
  }
}
