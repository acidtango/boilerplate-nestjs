import { Kysely, PostgresDialect } from 'kysely'
import { DatabaseSchema } from './DatabaseSchema'
import { DatabaseConnection } from './DatabaseConnection'

export function databaseConnectionFactory(): DatabaseConnection {
  return new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({
      host: 'localhost',
      database: 'develop',
      password: 'password',
      user: 'acid',
    }),
  })
}
