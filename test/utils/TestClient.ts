import { HttpStatus, INestApplication, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Server } from 'http'
import tepper from 'tepper'
import { ApplicationModule } from '../../src/application/ApplicationModule'
import { config } from '../../src/config'
import { PHONE_VALIDATOR_TOKEN } from '../../src/shared/domain/services/PhoneValidator'
import { MICHAEL } from '../../src/shared/fixtures/users'
import { DatabaseHealthIndicatorTypeOrm } from '../../src/shared/infrastructure/database/DatabaseHealthIndicatorTypeOrm'
import { AllDependencies } from './dependencies'
import { CODEMOTION } from '../../src/shared/fixtures/events'
import { EventResponseDTO } from '../../src/application/events/infrastructure/controllers/dtos/EventResponseDTO'
import { AppProvider } from '../../src/application/AppProviders'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'

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
      imports: [ApplicationModule],
    })
      // Here we override the necessary services
      .overrideProvider(DatabaseHealthIndicatorTypeOrm)
      .useValue(dependencies.databaseHealthIndicator)
      .overrideProvider(PHONE_VALIDATOR_TOKEN)
      .useValue(dependencies.phoneValidator)

    if (!config.forceEnableORMRepositories) {
      // We need to change the repositories with the orm ones
      testingModuleBuilder = testingModuleBuilder
        .overrideProvider(AppProvider.EVENT_REPOSITORY)
        .useValue(dependencies.eventRepository)
    }

    const moduleFixture = await testingModuleBuilder.compile()
    const nestApplication: INestApplication = moduleFixture.createNestApplication()
    nestApplication.setGlobalPrefix(config.apiPrefix)
    nestApplication.enableVersioning({ type: VersioningType.URI })
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

  createEvent() {
    return tepper(this.app)
      .post('/api/v1/events')
      .send({
        id: CODEMOTION.id,
        name: CODEMOTION.name,
        dateRange: {
          startDate: CODEMOTION.startDate,
          endDate: CODEMOTION.endDate,
        },
        proposalsDateRange: {
          startDate: CODEMOTION.proposalsStartDate,
          deadline: CODEMOTION.proposalsDeadlineDate,
        },
      })
      .expectStatus(HttpStatus.CREATED)
  }

  createSpeaker() {
    return tepper(this.app)
      .post('/api/v1/speakers')
      .send({
        id: JOYCE_LIN.id,
        name: JOYCE_LIN.name,
        age: JOYCE_LIN.age,
        language: JOYCE_LIN.language,
        email: JOYCE_LIN.email,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  getSpeaker(id = JOYCE_LIN.id) {
    return tepper(this.app).get(`/api/v1/speakers/${id}`).expectStatus(HttpStatus.OK)
  }

  getEvents() {
    return tepper(this.app).get<EventResponseDTO[]>('/api/v1/events').expectStatus(HttpStatus.OK)
  }
}
