/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Server } from 'http'
import { TypeOrmHealthIndicator } from '@nestjs/terminus'
import DatabaseHealthIndicatorFake from '../../src/shared/infrastructure/database/health-indicator.provider.fake'
import DatabaseHealthIndicator from '../../src/shared/domain/database-health-indicator.interface'
import AppConfig from '../../src/app.config'
import ApiModule from '../../src/api/api.module'
import { request } from './request'
import AppProviders from '../../src/app.providers'
import BookRepository from '../../src/domains/books/domain/book.repository.interface'
import BookRepositoryFake from '../../src/domains/books/infrastructure/repositories/book.repository.fake'

type Dependencies = {
  databaseHealthIndicator?: DatabaseHealthIndicator
}

type Repositories = {
  bookRepository?: BookRepository
}

type AllDependencies = Dependencies & Repositories

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
      .overrideProvider(TypeOrmHealthIndicator)
      .useValue(dependencies.databaseHealthIndicator)
      .overrideProvider(AppProviders.BOOK_REPOSITORY)
      .useValue(dependencies.bookRepository)

    if (!AppConfig.forceEnableORMRepositories) {
      // We need to change the repositories with the memory ones
      //
      // testingModuleBuilder = testingModuleBuilder
      //   .overrideProvider(EXAMPLE_REPOSITORY_TOKEN)
      //   .useValue(dependencies.exampleRepository)
    }

    const moduleFixture = await testingModuleBuilder.compile()
    const nestApplication: INestApplication = moduleFixture.createNestApplication()
    await nestApplication.init()

    TestClient.addAppInstance(nestApplication)

    this.app = nestApplication.getHttpServer()
  }

  health() {
    return request(this.app).get('/health')
  }
}

export async function createClient({
  databaseHealthIndicator = new DatabaseHealthIndicatorFake(),
  bookRepository = new BookRepositoryFake(),
}: AllDependencies = {}) {
  const client = new TestClient()

  await client.initialize({ databaseHealthIndicator, bookRepository })

  return client
}
