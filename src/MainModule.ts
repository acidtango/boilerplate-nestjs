import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core'
import { config } from './shared/infrastructure/config'
import { DatabaseSwitcherModule } from './shared/infrastructure/database/DatabaseSwitcherModule'
import { DomainErrorFilter } from './shared/infrastructure/filters/DomainErrorFilter'
import { ApplicationShutdownService } from './shared/infrastructure/services/ApplicationShutdownService'
import { UuidGeneratorModule } from './shared/infrastructure/services/uuid-generator/UuidGeneratorModule'
import { LoggerSwitcherModule } from './shared/infrastructure/LoggerSwitcher.module'
import { EventsModule } from './events/EventsModule'
import { SpeakersModule } from './speakers/SpeakersModule'
import { TalksModule } from './talks/TalksModule'
import { EventBusModule } from './shared/infrastructure/events/EventBus/EventBusModule'
import { ClockModule } from './shared/infrastructure/services/clock/ClockModule'
import { CryptoModule } from './shared/infrastructure/services/crypto/CryptoModule'
import { RolesGuard } from './shared/infrastructure/guards/JwtAuthGuard'
import { EmailSenderModule } from './shared/infrastructure/email/EmailSenderModule'

@Module({
  imports: [
    // Application modules
    EventsModule,
    SpeakersModule,
    TalksModule,
    // Services modules
    EventBusModule,
    CryptoModule,
    UuidGeneratorModule,
    ClockModule,
    EmailSenderModule,
    // Infrastructure modules
    LoggerSwitcherModule.init({ disable: config.testModeEnabled }),
    DatabaseSwitcherModule.init({
      disable: config.testModeEnabled && !config.forceEnableORMRepositories,
    }),
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ApplicationShutdownService,
  ],
})
export class MainModule {}
