import { HttpStatus, INestApplication, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Server } from 'http'
import tepper from 'tepper'
import { ApplicationModule } from '../../src/application/ApplicationModule'
import { config } from '../../src/config'
import { PHONE_VALIDATOR_TOKEN } from '../../src/shared/domain/services/PhoneValidator'
import { MICHAEL } from '../../src/shared/fixtures/users'
import { AllDependencies } from './dependencies'
import { CODEMOTION } from '../../src/shared/fixtures/events'
import { EventResponseDTO } from '../../src/application/events/infrastructure/controllers/dtos/EventResponseDTO'
import { AppProvider } from '../../src/application/AppProviders'
import { JOYCE_LIN } from '../../src/shared/fixtures/speakers'
import { API_TALK } from '../../src/shared/fixtures/talks'
import { FRAN } from '../../src/shared/fixtures/organizers'
import { TalkRepositoryMemory } from '../../src/application/talks/infrastructure/repositories/TalkRepositoryMemory'
import { EventRepositoryMemory } from '../../src/application/events/infrastructure/repositories/EventRepositoryMemory'

export class TestClient {
  private app!: Server

  private static readonly apps: INestApplication[] = []

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
      .overrideProvider(PHONE_VALIDATOR_TOKEN)
      .useValue(dependencies.phoneValidator)

    if (!config.forceEnableORMRepositories) {
      // We need to change the repositories with the orm ones
      testingModuleBuilder = testingModuleBuilder
        .overrideProvider(AppProvider.EVENT_REPOSITORY)
        .useClass(EventRepositoryMemory)
        .overrideProvider(AppProvider.TALK_REPOSITORY)
        .useClass(TalkRepositoryMemory)
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

  createEvent({ id = CODEMOTION.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/events')
      .send({
        id,
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

  createSpeaker({ id = JOYCE_LIN.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/speakers')
      .send({
        id,
        name: JOYCE_LIN.name,
        age: JOYCE_LIN.age,
        language: JOYCE_LIN.language,
        email: JOYCE_LIN.email,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  createTalk({ id = API_TALK.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/talks')
      .send({
        id,
        title: API_TALK.title,
        description: API_TALK.description,
        language: API_TALK.language,
        cospeakers: API_TALK.cospeakers,
        speakerId: JOYCE_LIN.id,
        eventId: CODEMOTION.id,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  getTalk(id = API_TALK.id) {
    return tepper(this.app).get(`/api/v1/talks/${id}`).expectStatus(HttpStatus.OK)
  }

  getSpeaker(id = JOYCE_LIN.id) {
    return tepper(this.app).get(`/api/v1/speakers/${id}`).expectStatus(HttpStatus.OK)
  }

  getEvents() {
    return tepper(this.app).get<EventResponseDTO[]>('/api/v1/events').expectStatus(HttpStatus.OK)
  }

  assignReviewer({ id = API_TALK.id, reviewerId = FRAN.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/assignation`)
      .send({ reviewerId })
      .expectStatus(HttpStatus.OK)
  }

  approveTalk({ id = API_TALK.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/approve`)

      .expectStatus(HttpStatus.OK)
  }
}
