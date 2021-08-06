import { Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import path from 'path'
import { config } from '../config'

const ormConfig: Options = {
  type: 'postgresql',
  host: config.db.mysql.host,
  cache: { enabled: false },
  port: config.db.mysql.port,
  user: config.db.mysql.username,
  password: config.db.mysql.password,
  dbName: config.db.mysql.database,
  entities: [path.resolve(__dirname, '../application/**/*Entity.{ts,js}')],
  migrations: {
    path: path.resolve(__dirname, './migrations'),
  },
  metadataProvider: TsMorphMetadataProvider,
}

// eslint-disable-next-line import/no-default-export
export default ormConfig
