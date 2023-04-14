import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { config } from '../config'
import { OrmSwitcherModule } from '../database/OrmSwitcherModule'
import { DomainErrorFilter } from '../shared/infrastructure/filters/DomainErrorFilter'
import { ApplicationShutdownService } from '../shared/infrastructure/services/ApplicationShutdownService'
import { UuidGeneratorModule } from '../shared/infrastructure/services/uuid-generator/UuidGeneratorModule'
import { LoggerSwitcherModule } from '../utils/LoggerSwitcher.module'
import { HealthModule } from '../api/health/HealthModule'
import { EventsModule } from './events/EventsModule'
import { SpeakersModule } from './speakers/SpeakersModule'

@Module({
  imports: [
    EventsModule,
    SpeakersModule,
    LoggerSwitcherModule.init({ disable: config.testModeEnabled }),
    OrmSwitcherModule.init({
      disable: config.testModeEnabled && !config.forceEnableORMRepositories,
    }),
    UuidGeneratorModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_FILTER,
      useClass: DomainErrorFilter,
    },
    ApplicationShutdownService,
  ],
})
export class ApplicationModule {}
