import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { config } from '../config'
import OrmSwitcherModule from '../database/OrmSwitcherModule'
import DomainErrorFilter from '../shared/infrastructure/filters/DomainErrorFilter'
import { PhoneValidatorModule } from '../shared/infrastructure/services/phone-validator/PhoneValidatorModule'
import { UuidGeneratorModule } from '../shared/infrastructure/services/uuid-generator/UuidGeneratorModule'
import HealthModule from './health/HealthModule'
import { UsersModule } from './users/UsersModule'

@Module({
  imports: [
    OrmSwitcherModule.init({
      disable: config.testModeEnabled && !config.forceEnableORMRepositories,
    }),
    PhoneValidatorModule,
    UuidGeneratorModule,
    UsersModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: DomainErrorFilter,
    },
  ],
})
export class ApiModule {}
