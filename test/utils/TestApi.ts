import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { ApplicationModule } from '../../src/application/ApplicationModule'
import { config } from '../../src/config'
import { AppProvider } from '../../src/application/AppProviders'
import { EventRepositoryMemory } from '../../src/application/events/infrastructure/repositories/EventRepositoryMemory'
import { TalkRepositoryMemory } from '../../src/application/talks/infrastructure/repositories/TalkRepositoryMemory'
import { SpeakerRepositoryMemory } from '../../src/application/speakers/infrastructure/repositories/SpeakerRepositoryMemory'
import { INestApplication, VersioningType } from '@nestjs/common'
import { Server } from 'http'
import { isReseteable } from '../../src/shared/infrastructure/repositories/Reseteable'

export class TestApi {
  private static instance: TestApi

  private app?: Server

  private nestApplication?: INestApplication

  public static async create() {
    if (!TestApi.instance) {
      TestApi.instance = new TestApi()
      await TestApi.instance.initialize()
    }

    return TestApi.instance
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  async initialize() {
    const testingModuleBuilder = this.createRootModule()
    const moduleFixture = await testingModuleBuilder.compile()
    this.nestApplication = moduleFixture.createNestApplication()
    this.nestApplication.setGlobalPrefix(config.apiPrefix)
    this.nestApplication.enableVersioning({ type: VersioningType.URI })
    await this.nestApplication.init()

    this.app = this.nestApplication.getHttpServer()
  }

  private createRootModule() {
    let testingModuleBuilder = Test.createTestingModule({
      imports: [ApplicationModule],
    })

    testingModuleBuilder = this.useThirdPartyMocks(testingModuleBuilder)

    if (!config.forceEnableORMRepositories) {
      testingModuleBuilder = this.useMemoryRepositories(testingModuleBuilder)
    }
    return testingModuleBuilder
  }

  private useMemoryRepositories(testingModuleBuilder: TestingModuleBuilder) {
    return testingModuleBuilder
      .overrideProvider(AppProvider.EVENT_REPOSITORY)
      .useClass(EventRepositoryMemory)
      .overrideProvider(AppProvider.TALK_REPOSITORY)
      .useClass(TalkRepositoryMemory)
      .overrideProvider(AppProvider.SPEAKER_REPOSITORY)
      .useClass(SpeakerRepositoryMemory)
  }

  private useThirdPartyMocks(testingModuleBuilder: TestingModuleBuilder) {
    return testingModuleBuilder
    // Here we override the necessary services
    // .overrideProvider(PHONE_VALIDATOR_TOKEN)
    // .useValue(new PhoneValidator);
  }

  async close() {
    await this.nestApplication?.close()
  }

  public getApp() {
    if (!this.app) {
      throw new Error('TestApi not initialized')
    }

    return this.app
  }

  private getNestApplication() {
    if (!this.nestApplication) {
      throw new Error('TestApi not initialized')
    }

    return this.nestApplication
  }

  async clearState() {
    const promises = Object.values(AppProvider)
      .map((token) => this.getNestApplication().get(token))
      .filter(isReseteable)
      .map((dependency) => dependency.reset())

    await Promise.all(promises)
  }
}
