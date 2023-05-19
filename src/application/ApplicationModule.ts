import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { config } from '../config'
import { OrmSwitcherModule } from '../shared/infrastructure/database/OrmSwitcherModule'
import { DomainErrorFilter } from '../shared/infrastructure/filters/DomainErrorFilter'
import { ApplicationShutdownService } from '../shared/infrastructure/services/ApplicationShutdownService'
import { UuidGeneratorModule } from '../shared/infrastructure/services/uuid-generator/UuidGeneratorModule'
import { LoggerSwitcherModule } from '../utils/LoggerSwitcher.module'
import { EventsModule } from './events/EventsModule'
import { SpeakersModule } from './speakers/SpeakersModule'
import { TalksModule } from './talks/TalksModule'
import { EventBusModule } from '../shared/infrastructure/events/EventBusModule'
import { ClockModule } from '../shared/infrastructure/services/clock/ClockModule'
import { CryptoModule } from '../shared/infrastructure/services/crypto/CryptoModule'

@Module({
  imports: [
    EventBusModule,
    EventsModule,
    SpeakersModule,
    TalksModule,
    CryptoModule,
    LoggerSwitcherModule.init({ disable: config.testModeEnabled }),
    OrmSwitcherModule.init({
      disable: config.testModeEnabled && !config.forceEnableORMRepositories,
    }),
    UuidGeneratorModule,
    ClockModule,
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
