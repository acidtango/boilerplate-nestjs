import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common'
import { config } from '../config'

@Injectable()
export class ApplicationShutdownService implements OnApplicationShutdown {
  private readonly logger = new Logger(ApplicationShutdownService.name)

  onApplicationShutdown(signal?: string) {
    if (!config.testModeEnabled && signal) {
      this.logger.error('Application received signal: ' + signal)
    }
  }
}
