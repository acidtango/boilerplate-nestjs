import { Inject, Injectable } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { sql } from 'kysely'
import { CustomHealthIndicator } from '../services/CustomHealthIndicator'
import { DATABASE_CONNECTION, DatabaseConnection } from '../../../database/DatabaseConnection'

@Injectable()
export class DatabaseHealthIndicatorKysely
  extends HealthIndicator
  implements CustomHealthIndicator
{
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: DatabaseConnection) {
    super()
  }

  async checkHealth(key: string): Promise<HealthIndicatorResult> {
    try {
      await sql`select 1`.execute(this.db)
      return this.getStatus(key, true)
    } catch (error) {
      return this.getStatus(key, false, { error })
    }
  }
}
