import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from './orm.config'

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
      imports: [TypeOrmModule.forRoot(ormConfig)],
    }
  }
}
