import { TestClient } from '../utils/TestClient'
import { Kysely } from 'kysely'
import { databaseConnectionFactory } from '../../src/database/DatabaseConnectionFactory'
import { DatabaseSchema } from '../../src/database/DatabaseSchema'

let db: Kysely<DatabaseSchema>

beforeAll(async () => {
  db = databaseConnectionFactory()
}, 15000)

beforeEach(async () => {
  await db.deleteFrom('contacts').execute()
  await db.deleteFrom('users').execute()
})

afterEach(async () => {
  await TestClient.teardownApps()
})

afterAll(async () => {
  await db.destroy()
})
