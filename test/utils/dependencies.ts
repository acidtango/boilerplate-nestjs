import { UserRepositoryMemory } from '../../src/application/users/infrastructure/repositories/UserRepositoryMemory'
import { DatabaseHealthIndicator } from '../../src/shared/domain/services/DatabaseHealthIndicator'
import { PhoneValidator } from '../../src/shared/domain/services/PhoneValidator'

type Dependencies = {
  databaseHealthIndicator?: DatabaseHealthIndicator
  phoneValidator?: PhoneValidator
}

type Repositories = {
  userRepository?: UserRepositoryMemory
}

export type AllDependencies = Dependencies & Repositories
