import { HttpStatus, INestApplication, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Server } from 'http'
import tepper from 'tepper'
import { ApiModule } from '../../src/api/ApiModule'
import { USER_REPOSITORY_TOKEN } from '../../src/application/users/domain/UserRepository'
import { UserRepositoryMemory } from '../../src/application/users/infrastructure/repositories/UserRepositoryMemory'
import { config } from '../../src/config'
import { EVENT_BUS_TOKEN } from '../../src/shared/domain/events/EventBus'
import { PHONE_VALIDATOR_TOKEN } from '../../src/shared/domain/services/PhoneValidator'
import { MICHAEL } from '../../src/shared/fixtures/users'
import { REPOSITORY_HEALTH_INDICATOR_TOKEN } from '../../src/shared/infrastructure/database/RepositoryHealthIndicator'
import { RepositoryHealthIndicatorFake } from '../../src/shared/infrastructure/database/RepositoryHealthIndicatorFake'
import { EventBusFake } from '../../src/shared/infrastructure/events/EventBusFake'
import { PhoneValidatorFake } from '../../src/shared/infrastructure/services/phone-validator/PhoneValidatorFake'
import { TestClientUtils } from './TestClientUtils'

export class TestClient {
  private server!: Server

  private static app?: INestApplication

  public getProvider<T>(dependencyKey: string) {
    return TestClient.app?.get<T>(dependencyKey)
  }

  public static async tearDownApp() {
    await TestClient.app?.close()
  }

  public static async create() {
    const client = new TestClient()
    const utils = new TestClientUtils(client)

    await client.initialize()

    return { client, utils }
  }

  private async initialize() {
    // eslint-disable-next-line prefer-const
    let testingModuleBuilder = Test.createTestingModule({
      imports: [ApiModule],
    })
      // Here we override the necessary services
      .overrideProvider(REPOSITORY_HEALTH_INDICATOR_TOKEN)
      .useClass(RepositoryHealthIndicatorFake)
      .overrideProvider(PHONE_VALIDATOR_TOKEN)
      .useClass(PhoneValidatorFake)
      .overrideProvider(EVENT_BUS_TOKEN)
      .useClass(EventBusFake)

    if (!config.forceEnableORMRepositories) {
      // We need to change the repositories with the orm ones
      testingModuleBuilder = testingModuleBuilder
        .overrideProvider(USER_REPOSITORY_TOKEN)
        .useClass(UserRepositoryMemory)
    }

    const moduleFixture = await testingModuleBuilder.compile()
    const nestApplication: INestApplication = moduleFixture.createNestApplication()
    nestApplication.enableVersioning({
      type: VersioningType.URI,
      prefix: config.apiVersioningPrefix,
    })
    await nestApplication.init()

    TestClient.app = nestApplication
    this.server = nestApplication.getHttpServer()
  }

  health() {
    return tepper(this.server).get('/health')
  }

  createUser({ name = MICHAEL.name, lastName = MICHAEL.lastName, phone = MICHAEL.phone } = {}) {
    return tepper(this.server)
      .post('/api/v1/users')
      .send({
        name,
        lastName,
        phone,
      })
      .expect(HttpStatus.CREATED)
  }

  updateUserContacts({ id = '', contacts = MICHAEL.contacts } = {}) {
    return tepper(this.server)
      .post(`/api/v1/users/${id}/contacts`)
      .expect(HttpStatus.CREATED)
      .send(contacts)
  }

  getUserContacts({ id = '' }) {
    return tepper(this.server).get(`/api/v1/users/${id}/contacts`).expect(HttpStatus.OK)
  }

  getCommonContacts(userId1: string, userId2: string) {
    return tepper(this.server)
      .get(`/api/v1/users/common-contacts`)
      .withQuery({
        userId1,
        userId2,
      })
      .expect(HttpStatus.OK)
  }
}
