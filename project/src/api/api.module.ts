import { Module } from '@nestjs/common'
import AppConfig from '../app.config'
import OrmSwitcherModule from '../database/orm-switcher.module'
import HealthModule from './health/health.module'

@Module({
  imports: [
    HealthModule,
    OrmSwitcherModule.init({
      disable: AppConfig.testModeEnabled && !AppConfig.forceEnableORMRepositories,
    }),
  ],
  controllers: [],
})
export default class ApiModule {}
