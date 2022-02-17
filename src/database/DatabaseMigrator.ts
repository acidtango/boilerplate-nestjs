import { FileMigrationProvider, Kysely, Migrator } from 'kysely'
import { databaseConnectionFactory } from './DatabaseConnectionFactory'
import { resolve } from 'path'

export const migrator = new Migrator({
  db: databaseConnectionFactory() as unknown as Kysely<unknown>,
  provider: new FileMigrationProvider(resolve(__dirname, './migrations')),
})
