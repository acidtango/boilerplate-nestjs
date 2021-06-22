import path from 'path'
import { ConnectionOptions } from 'typeorm'
import { config } from '../config'

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.db.postgres.host,
  port: config.db.postgres.port,
  username: config.db.postgres.username,
  password: config.db.postgres.password,
  database: config.db.postgres.database,
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

export = ormConfig
