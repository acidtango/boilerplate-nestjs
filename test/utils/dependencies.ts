import { PhoneValidator } from '../../src/application/shared/domain/services/PhoneValidator'
import { CustomHealthIndicator } from '../../src/application/shared/infrastructure/services/CustomHealthIndicator'
import { EventRepositoryMemory } from '../../src/application/events/infrastructure/repositories/EventRepositoryMemory'

type Dependencies = {
  databaseHealthIndicator?: CustomHealthIndicator
  phoneValidator?: PhoneValidator
}

type Repositories = {
  eventRepository?: EventRepositoryMemory
}

export type AllDependencies = Dependencies & Repositories
