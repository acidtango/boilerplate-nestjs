import { DynamicModule, Module } from '@nestjs/common'
import { MongoModule } from './MongoModule'

@Module({})
export class OrmSwitcherModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: OrmSwitcherModule,
      }
    }

    return {
      module: OrmSwitcherModule,
      imports: [MongoModule],
    }
  }
}
