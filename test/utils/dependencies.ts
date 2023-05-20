import { PhoneValidator } from '../../src/shared/domain/services/PhoneValidator'
import { CustomHealthIndicator } from '../../src/shared/infrastructure/services/CustomHealthIndicator'
import { EventRepositoryMemory } from '../../src/events/infrastructure/repositories/EventRepositoryMemory'

type Dependencies = {
  databaseHealthIndicator?: CustomHealthIndicator
  phoneValidator?: PhoneValidator
}

type Repositories = {
  eventRepository?: EventRepositoryMemory
}

export type AllDependencies = Dependencies & Repositories
