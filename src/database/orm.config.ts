import path from 'path'
import { ConnectionOptions } from 'typeorm'
import AppConfig from '../app.config'

const config: ConnectionOptions = {
  type: 'postgres',
  host: AppConfig.db.postgres.host,
  port: AppConfig.db.postgres.port,
  username: AppConfig.db.postgres.username,
  password: AppConfig.db.postgres.password,
  database: AppConfig.db.postgres.database,
  entities: [path.resolve(__dirname, '../**/*.entity.*{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  logging: true,
  logger: 'file',
  migrations: [path.resolve(__dirname, './migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
}

export = config
