import { Module } from '@nestjs/common'
import AppConfig from '../app.config'
import OrmSwitcherModule from '../database/orm-switcher.module'
import BooksModule from './books/books.module'
import HealthModule from './health/health.module'

@Module({
  imports: [
    OrmSwitcherModule.init({
      disable: AppConfig.testModeEnabled && !AppConfig.forceEnableORMRepositories,
    }),
    BooksModule,
    HealthModule,
  ],
  controllers: [],
})
export default class ApiModule {}
