import { Module } from '@nestjs/common'
import { config } from '../config'
import OrmSwitcherModule from '../database/OrmSwitcherModule'
import BooksModule from './books/BooksModule'
import HealthModule from './health/HealthModule'

@Module({
  imports: [
    OrmSwitcherModule.init({
      disable: config.testModeEnabled && !config.forceEnableORMRepositories,
    }),
    BooksModule,
    HealthModule,
  ],
  controllers: [],
})
export default class ApiModule {}
