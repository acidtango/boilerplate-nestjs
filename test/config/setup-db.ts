import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { dropTables } from '../utils/DropTables'
import { TestClient } from '../utils/TestClient'

let orm: MikroORM<PostgreSqlDriver>

beforeAll(async () => {
  orm = await MikroORM.init()
}, 15000)

beforeEach(async () => {
  await dropTables(orm)
})

afterEach(async () => {
  await TestClient.teardownApps()
})

afterAll(async () => {
  await orm.close()
})
