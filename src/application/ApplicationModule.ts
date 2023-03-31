import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { config } from '../config'
import { OrmSwitcherModule } from '../database/OrmSwitcherModule'
import { DomainErrorFilter } from '../shared/infrastructure/filters/DomainErrorFilter'
import { ApplicationShutdownService } from '../shared/infrastructure/services/ApplicationShutdownService'
import { PhoneValidatorModule } from '../shared/infrastructure/services/phone-validator/PhoneValidatorModule'
import { UuidGeneratorModule } from '../shared/infrastructure/services/uuid-generator/UuidGeneratorModule'
import { LoggerSwitcherModule } from '../utils/LoggerSwitcher.module'
import { HealthModule } from '../api/health/HealthModule'
import { UsersModule } from '../api/users/UsersModule'
import { EventsModule } from './events/EventsModule'

@Module({
  imports: [
    EventsModule,
    LoggerSwitcherModule.init({ disable: config.testModeEnabled }),
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
    ApplicationShutdownService,
  ],
})
export class ApplicationModule {}
