import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { config } from '../config'
import { OrmSwitcherModule } from '../database/OrmSwitcherModule'
import { EventBusModule } from '../shared/infrastructure/events/EventBusModule'
import { DomainErrorFilter } from '../shared/infrastructure/filters/DomainErrorFilter'
import { DomainEventRepositoryModule } from '../shared/infrastructure/repositories/DomainEventRepositoryModule'
import { ApplicationShutdownService } from '../shared/infrastructure/services/ApplicationShutdownService'
import { PhoneValidatorModule } from '../shared/infrastructure/services/phone-validator/PhoneValidatorModule'
import { SMSClientModule } from '../shared/infrastructure/services/sms-client/SMSClientModule'
import { UuidGeneratorModule } from '../shared/infrastructure/services/uuid-generator/UuidGeneratorModule'
import { LoggerSwitcherModule } from '../utils/LoggerSwitcher.module'
import { HealthModule } from './health/HealthModule'
import { UsersModule } from './users/UsersModule'

@Module({
  imports: [
    LoggerSwitcherModule.init({ disable: config.testModeEnabled }),
    OrmSwitcherModule.init({
      disable: config.testModeEnabled && !config.forceEnableORMRepositories,
    }),
    EventBusModule,
    PhoneValidatorModule,
    UuidGeneratorModule,
    SMSClientModule,
    UsersModule,
    HealthModule,
    DomainEventRepositoryModule,
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
    ApplicationShutdownService,
  ],
})
export class ApiModule {}
