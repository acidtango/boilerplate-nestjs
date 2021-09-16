import { UserRepositoryMemory } from '../../src/application/users/infrastructure/repositories/UserRepositoryMemory'
import { PhoneValidator } from '../../src/shared/domain/services/PhoneValidator'
import { CustomHealthIndicator } from '../../src/shared/infrastructure/services/CustomHealthIndicator'

type Dependencies = {
  databaseHealthIndicator?: CustomHealthIndicator
  phoneValidator?: PhoneValidator
}

type Repositories = {
  userRepository?: UserRepositoryMemory
}

export type AllDependencies = Dependencies & Repositories
