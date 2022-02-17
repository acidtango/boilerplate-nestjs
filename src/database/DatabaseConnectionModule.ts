import { DynamicModule, Global, Inject, Module, Optional } from '@nestjs/common'
import { databaseConnectionFactory } from './DatabaseConnectionFactory'
import { DATABASE_CONNECTION, DatabaseConnection } from './DatabaseConnection'

@Global()
@Module({})
export class DatabaseConnectionModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: DatabaseConnectionModule,
      }
    }

    return {
      module: DatabaseConnectionModule,
      providers: [
        {
          provide: DATABASE_CONNECTION,
          useFactory: databaseConnectionFactory,
        },
      ],
      exports: [DATABASE_CONNECTION],
    }
  }

  constructor(
    @Optional()
    @Inject(DATABASE_CONNECTION)
    private db?: DatabaseConnection
  ) {}

  async onModuleDestroy() {
    await this.db?.destroy()
  }
}
