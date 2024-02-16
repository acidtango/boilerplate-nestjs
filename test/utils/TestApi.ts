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
import { SQSQueueClient } from '../../src/shared/infrastructure/queue/SQSQueueClient'
import { CreateQueueCommand, SQSClient } from '@aws-sdk/client-sqs'
import { SQSQueueUrl } from '../../src/shared/infrastructure/queue/SQSConnectionUrl'

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
    const testingModuleBuilder = await this.createRootModule()
    const moduleFixture = await testingModuleBuilder.compile()
    this.nestApplication = moduleFixture.createNestApplication()
    this.nestApplication.setGlobalPrefix(config.apiPrefix)
    this.nestApplication.enableVersioning({ type: VersioningType.URI })
    await this.nestApplication.init()

    this.app = this.nestApplication.getHttpServer()
  }

  private async createRootModule() {
    let testingModuleBuilder = Test.createTestingModule({
      imports: [MainModule],
    })

    testingModuleBuilder = await this.useThirdPartyMocks(testingModuleBuilder)

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

  private async useThirdPartyMocks(testingModuleBuilder: TestingModuleBuilder) {
    // Here we override the necessary services
    const anyAccesKey = 'na'
    const anyPrivateAccessKey = 'na'
    const defaultRegion = 'eu-west-1'
    const localEndpoint = `http://${config.sqs.host}:${config.sqs.port}`
    const sqsClient = new SQSQueueClient(
      new SQSClient({
        credentials: {
          accessKeyId: anyAccesKey,
          secretAccessKey: anyPrivateAccessKey,
        },
        region: defaultRegion,
        endpoint: localEndpoint,
      })
    )
    const localQueueName = 'cola-de-prueba1'
    const createQueueCommand = new CreateQueueCommand({
      QueueName: localQueueName,
    })
    const response = await sqsClient.getClient().send(createQueueCommand)
    const queueUrl = new SQSQueueUrl(response.QueueUrl ?? '')

    return testingModuleBuilder
      .overrideProvider(Token.EMAIL_SENDER)
      .useClass(EmailSenderFake)
      .overrideProvider(SQSQueueUrl)
      .useValue(queueUrl)
      .overrideProvider(SQSQueueClient)
      .useValue(sqsClient)
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
