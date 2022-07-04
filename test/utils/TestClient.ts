import { INestApplication, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Server } from 'http'
import tepper from 'tepper'
import { ApiModule } from '../../src/api/ApiModule'
import { USER_REPOSITORY_TOKEN } from '../../src/application/users/domain/UserRepository'
import { config } from '../../src/config'
import { PHONE_VALIDATOR_TOKEN } from '../../src/shared/domain/services/PhoneValidator'
import { MICHAEL } from '../../src/shared/fixtures/users'
import { DatabaseHealthIndicatorMikroOrm } from '../../src/shared/infrastructure/database/DatabaseHealthIndicatorMikroOrm'
import { AllDependencies } from './dependencies'
import { EVENT_BUS_TOKEN } from '../../src/shared/domain/events/EventBus'
import { EventBusFake } from '../../src/shared/infrastructure/events/EventBusFake'

export class TestClient {
  private app!: Server

  private static apps: INestApplication[] = []

  private static addAppInstance(app: INestApplication) {
    this.apps.push(app)
  }

  public static async teardownApps() {
    for await (const app of this.apps) {
      app.close()
    }
  }

  async initialize(dependencies: AllDependencies) {
    // eslint-disable-next-line prefer-const
    let testingModuleBuilder = Test.createTestingModule({
      imports: [ApiModule],
    })
      // Here we override the necessary services
      .overrideProvider(DatabaseHealthIndicatorMikroOrm)
      .useValue(dependencies.databaseHealthIndicator)
      .overrideProvider(PHONE_VALIDATOR_TOKEN)
      .useValue(dependencies.phoneValidator)
      .overrideProvider(EVENT_BUS_TOKEN)
      .useClass(EventBusFake)

    if (!config.forceEnableORMRepositories) {
      // We need to change the repositories with the orm ones
      testingModuleBuilder = testingModuleBuilder
        .overrideProvider(USER_REPOSITORY_TOKEN)
        .useValue(dependencies.userRepository)
    }

    const moduleFixture = await testingModuleBuilder.compile()
    const nestApplication: INestApplication = moduleFixture.createNestApplication()
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
