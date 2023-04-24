import { TestClient } from '../utils/TestClient'
import { MongoModule } from '../../src/shared/infrastructure/database/MongoModule'
import { MongoClient } from 'mongodb'

let client: MongoClient
let mongoModule: MongoModule

beforeAll(async () => {
  client = MongoModule.createMongoClient()
  mongoModule = new MongoModule(client)
  await mongoModule.onModuleInit()
}, 15000)

beforeEach(async () => {
  await client.db('develop').dropDatabase()
})

afterEach(async () => {
  await TestClient.teardownApps()
})

afterAll(async () => {
  await mongoModule.onModuleDestroy()
})
