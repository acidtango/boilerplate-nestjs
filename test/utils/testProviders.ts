import { Type } from '@nestjs/common'
import { UserRepositoryMemory } from '../../src/application/users/infrastructure/repositories/UserRepositoryMemory'
import { UserRepositoryTypeORM } from '../../src/application/users/infrastructure/repositories/UserRepositoryTypeORM'
import { AppProvider } from '../../src/AppProvider'
import { config } from '../../src/config'
import { DatabaseHealthIndicatorFake } from '../../src/shared/infrastructure/database/DatabaseHealthIndicatorFake'
import { PhoneValidatorFake } from '../../src/shared/infrastructure/services/phone-validator/PhoneValidatorFake'

const enableORMRepositories = config.forceEnableORMRepositories

export const TEST_PROVIDERS = {
  [AppProvider.HEALTH_INDICATOR]: DatabaseHealthIndicatorFake,
  [AppProvider.PHONE_VALIDATOR]: PhoneValidatorFake,
  [AppProvider.USER_REPOSITORY]: enableORMRepositories
    ? UserRepositoryTypeORM
    : UserRepositoryMemory,
}

TEST_PROVIDERS as Record<AppProvider, Type<unknown>>
