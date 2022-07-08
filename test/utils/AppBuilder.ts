import { VersioningType } from '@nestjs/common'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { ApiModule } from '../../src/api/ApiModule'
import { USER_REPOSITORY_TOKEN } from '../../src/application/users/domain/UserRepository'
import { config } from '../../src/config'
import { PHONE_VALIDATOR_TOKEN } from '../../src/shared/domain/services/PhoneValidator'
import { EVENT_BUS_TOKEN } from '../../src/shared/domain/events/EventBus'
import { EventBusFake } from '../../src/shared/infrastructure/events/EventBusFake'
import { RepositoryHealthIndicatorFake } from '../../src/shared/infrastructure/database/RepositoryHealthIndicatorFake'
import { PhoneValidatorFake } from '../../src/shared/infrastructure/services/phone-validator/PhoneValidatorFake'
import { UserRepositoryMemory } from '../../src/application/users/infrastructure/repositories/UserRepositoryMemory'
import { REPOSITORY_HEALTH_INDICATOR_TOKEN } from '../../src/shared/infrastructure/database/RepositoryHealthIndicator'

export class AppBuilder {
  private static instantiate() {
    return Test.createTestingModule({ imports: [ApiModule] })
  }

  private static overrideServices(module: TestingModuleBuilder) {
    return module
      .overrideProvider(REPOSITORY_HEALTH_INDICATOR_TOKEN)
      .useClass(RepositoryHealthIndicatorFake)
      .overrideProvider(PHONE_VALIDATOR_TOKEN)
      .useClass(PhoneValidatorFake)
      .overrideProvider(EVENT_BUS_TOKEN)
      .useClass(EventBusFake)
  }

  private static overrideRepositories(module: TestingModuleBuilder) {
    return module.overrideProvider(USER_REPOSITORY_TOKEN).useClass(UserRepositoryMemory)
  }

  static async build() {
    let testingModuleBuilder = this.instantiate()
    testingModuleBuilder = this.overrideServices(testingModuleBuilder)
    testingModuleBuilder = config.forceEnableORMRepositories
      ? testingModuleBuilder
      : this.overrideRepositories(testingModuleBuilder)

    const moduleFixture = await testingModuleBuilder.compile()
    const nestApplication = moduleFixture.createNestApplication()
    nestApplication.enableVersioning({
      type: VersioningType.URI,
      prefix: config.apiVersioningPrefix,
    })
    await nestApplication.init()

    return nestApplication
  }
}
