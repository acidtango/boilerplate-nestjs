import { DataSource } from 'typeorm'
import { typeOrm } from '../../src/database/orm.config'
import { dropTables } from '../utils/DropTables'
import { TestClient } from '../utils/TestClient'

let dataSource: DataSource

beforeAll(async () => {
  dataSource = await typeOrm.initialize()
}, 15000)

beforeEach(async () => {
  await dropTables(dataSource)
})

afterEach(async () => {
  await TestClient.teardownApps()
})

afterAll(async () => {
  await dataSource.destroy()
})
