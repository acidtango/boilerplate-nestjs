import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from '../config'

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.db.postgresql.host,
  port: config.db.postgresql.port,
  username: config.db.postgresql.username,
  password: config.db.postgresql.password,
  database: config.db.postgresql.database,
  entities: [path.resolve(__dirname, '../application/**/*Entity.{ts,js}')],
  migrations: {
    path: path.resolve(__dirname, './migrations/*.ts'),
  },
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'typeorm_migrations',
}

const dataSourceOptions: DataSourceOptions = { type: 'postgres', ...ormConfig }
const typeOrmInstance = new DataSource(dataSourceOptions)

export const typeOrm = {
  instance: typeOrmInstance,
  initialize: () => new DataSource(dataSourceOptions).initialize(),
}

// eslint-disable-next-line import/no-default-export
export default typeOrmInstance
