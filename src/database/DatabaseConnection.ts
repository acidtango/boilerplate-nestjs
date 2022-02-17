import { Kysely } from 'kysely'
import { DatabaseSchema } from './DatabaseSchema'

export const DATABASE_CONNECTION = 'DB_CONNECTION'

export type DatabaseConnection = Kysely<DatabaseSchema>
