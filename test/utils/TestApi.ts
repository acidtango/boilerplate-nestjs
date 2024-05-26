import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { MainModule } from '../../src/MainModule'
import { config } from '../../src/shared/infrastructure/config'
import { Token } from '../../src/shared/domain/services/Token'
import { EventRepositoryMemory } from '../../src/events/infrastructure/repositories/EventRepositoryMemory'
import { TalkRepositoryMemory } from '../../src/talks/infrastructure/repositories/TalkRepositoryMemory'
import { SpeakerRepositoryMemory } from '../../src/speakers/infrastructure/repositories/SpeakerRepositoryMemory'
import { INestApplication, VersioningType } from '@nestjs/common'
import { Server } from 'http'
import { isReseteable } from '../../src/shared/infrastructure/repositories/Reseteable'
import { ClockFake } from '../../src/shared/infrastructure/services/clock/ClockFake'
import { EmailSenderFake } from '../fakes/EmailSenderFake'
import { EventBusMemory } from '../../src/shared/infrastructure/events/EventBus/EventBusMemory'
import { EventBus } from '../../src/shared/domain/models/hex/EventBus'

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
      imports: [MainModule],
    })

    testingModuleBuilder = this.useThirdPartyMocks(testingModuleBuilder)

    if (!config.forceEnableORMRepositories) {
      testingModuleBuilder = this.useMemoryRepositories(testingModuleBuilder)
    }
    return testingModuleBuilder
  }

  private useMemoryRepositories(testingModuleBuilder: TestingModuleBuilder) {
    return testingModuleBuilder
      .overrideProvider(Token.EVENT_REPOSITORY)
      .useClass(EventRepositoryMemory)
      .overrideProvider(Token.TALK_REPOSITORY)
      .useClass(TalkRepositoryMemory)
      .overrideProvider(Token.SPEAKER_REPOSITORY)
      .useClass(SpeakerRepositoryMemory)
      .overrideProvider(Token.EVENT_BUS)
      .useClass(EventBusMemory)
  }

  private useThirdPartyMocks(testingModuleBuilder: TestingModuleBuilder) {
    // Here we override the necessary services
    return testingModuleBuilder.overrideProvider(Token.EMAIL_SENDER).useClass(EmailSenderFake)
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

  public getClock() {
    return this.getNestApplication().get<ClockFake>(Token.CLOCK)
  }

  public getEventBus() {
    return this.getNestApplication().get<EventBus>(Token.EVENT_BUS)
  }

  public getEmailSender() {
    return this.getNestApplication().get<EmailSenderFake>(Token.EMAIL_SENDER)
  }

  private getNestApplication() {
    if (!this.nestApplication) {
      throw new Error('TestApi not initialized')
    }

    return this.nestApplication
  }

  async clearState() {
    const promises = Object.values(Token)
      .map((token) => this.getNestApplication().get(token))
      .filter(isReseteable)
      .map((dependency) => dependency.reset())

    await Promise.all(promises)
  }
}
