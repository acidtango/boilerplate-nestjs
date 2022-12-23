import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from '../config'

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.db.postgresql.host,
  port: config.db.postgresql.port,
  username: config.db.postgresql.username,
  password: config.db.postgresql.password,
  database: config.db.postgresql.database,
  entities: [path.resolve(__dirname, '../**/**/*Entity.{ts,js}')],
  migrations: {
    path: path.resolve(__dirname, './migrations/*.ts'),
  },
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'typeorm_migrations',
}

const typeOrmInstance = new DataSource(ormConfig)

export const typeOrm = {
  instance: typeOrmInstance,
  initialize: () => new DataSource(ormConfig).initialize(),
}

// eslint-disable-next-line import/no-default-export
export default typeOrmInstance
