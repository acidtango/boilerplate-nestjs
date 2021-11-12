import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common'

@Injectable()
export class ApplicationShutdownService implements OnApplicationShutdown {
  private readonly logger = new Logger(ApplicationShutdownService.name)

  onApplicationShutdown(signal?: string) {
    this.logger.error('Application received signal: ' + signal)
  }
}
