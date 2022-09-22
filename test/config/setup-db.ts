import { DataSource } from 'typeorm'
import { typeOrm } from '../../src/database/orm.config'
import { dropTables } from '../utils/DropTables'
import { TestClient } from '../utils/TestClient'

let orm: DataSource

beforeAll(async () => {
  orm = await typeOrm.initialize()
}, 15000)

beforeEach(async () => {
  await dropTables(orm)
})

afterEach(async () => {
  await TestClient.teardownApps()
})

afterAll(async () => {
  await orm.destroy()
})
