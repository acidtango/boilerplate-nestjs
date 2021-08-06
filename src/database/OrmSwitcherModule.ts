import { DynamicModule, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import ormConfig from './orm.config'

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
      imports: [MikroOrmModule.forRoot(ormConfig)],
    }
  }
}
