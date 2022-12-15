import { INestApplication, VersioningType } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Server } from 'http'
import tepper from 'tepper'
import { ApiModule } from '../../src/api/ApiModule'
import { AppProvider } from '../../src/AppProvider'
import { config } from '../../src/config'
import { MICHAEL } from '../../src/shared/fixtures/users'
import { TestClientUtils } from './TestClientUtils'
import { TEST_PROVIDERS } from './testProviders'

export class TestClient {
  private app!: Server

  private static apps: INestApplication[] = []

  public utils!: TestClientUtils

  public moduleRef!: TestingModule

  private static addAppInstance(app: INestApplication) {
    this.apps.push(app)
  }

  public static async teardownApps() {
    for await (const app of this.apps) {
      app.close()
    }
  }

  static async create() {
    const client = new TestClient()

    await client.initialize()

    return client
  }

  getProvider<T extends AppProvider>(provider: T): InstanceType<typeof TEST_PROVIDERS[T]> {
    return this.moduleRef.get(provider)
  }

  async initialize() {
    this.utils = new TestClientUtils(this)

    const testingModuleBuilder = Test.createTestingModule({
      imports: [ApiModule],
    })

    Object.entries(TEST_PROVIDERS).forEach(([provider, overrideClass]) =>
      testingModuleBuilder.overrideProvider(provider).useClass(overrideClass)
    )

    this.moduleRef = await testingModuleBuilder.compile()
    const nestApplication: INestApplication = this.moduleRef.createNestApplication()
    nestApplication.enableVersioning({
      type: VersioningType.URI,
      prefix: config.apiVersioningPrefix,
    })
    await nestApplication.init()

    TestClient.addAppInstance(nestApplication)

    this.app = nestApplication.getHttpServer()
  }

  health() {
    return tepper(this.app).get('/health')
  }

  createUser({ name = MICHAEL.name, lastName = MICHAEL.lastName, phone = MICHAEL.phone } = {}) {
    return tepper(this.app).post('/api/v1/users').send({
      name,
      lastName,
      phone,
    })
  }

  updateUserContacts({ id = '', contacts = MICHAEL.contacts } = {}) {
    return tepper(this.app).post(`/api/v1/users/${id}/contacts`).send(contacts)
  }

  getUserContacts({ id = '' }) {
    return tepper(this.app).get(`/api/v1/users/${id}/contacts`)
  }

  getCommonContacts(userId1: string, userId2: string) {
    return tepper(this.app).get(`/api/v1/users/common-contacts`).withQuery({
      userId1,
      userId2,
    })
  }
}
